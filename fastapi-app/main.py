from fastapi import FastAPI, Depends, BackgroundTasks
from sqlalchemy.orm import Session

import models
import schemas
from database import SessionLocal, engine, Base
from auth import hash_password, verify_password
from tasks import write_notification

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Library Management API",
    description="Day 6 - Authentication & Authorization",
    version="1.0.0"
)
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def send_notification(message: str):
    with open("notifications.txt", "a") as file:
        file.write(message + "\n")

# Root endpoint
@app.get("/")
def root():
    return {"message": "Library API Running"}

@app.post("/notify")
def notify(background_tasks: BackgroundTasks):
    background_tasks.add_task(
        send_notification,
        "A background notification was triggered."
    )

    return {
        "message": "Notification is being processed in the background."
    }
# ==========================
# Authentication Endpoints
# ==========================

@app.post("/register")
def register(user: schemas.UserCreate):
    hashed_password = hash_password(user.password)

    return {
        "username": user.username,
        "hashed_password": hashed_password
    }


@app.post("/login")
def login(user: schemas.UserLogin):
    # Demo password verification
    hashed_password = hash_password("123456")

    if verify_password(user.password, hashed_password):
        return {"message": "Login successful"}

    return {"message": "Invalid credentials"}


# ==========================
# Book CRUD Endpoints
# ==========================

@app.post("/books")
def create_book(
    book: schemas.BookCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    new_book = models.Book(
        title=book.title,
        author=book.author
    )

    db.add(new_book)
    db.commit()
    db.refresh(new_book)

    # Run background task
    background_tasks.add_task(write_notification, book.title)

    return {
        "message": "Book added successfully. Background task started.",
        "book": {
            "id": new_book.id,
            "title": new_book.title,
            "author": new_book.author
        }
    }


@app.get("/books")
def get_books(db: Session = Depends(get_db)):
    return db.query(models.Book).all()


@app.put("/books/{book_id}")
def update_book(book_id: int, book: schemas.BookCreate, db: Session = Depends(get_db)):
    db_book = db.query(models.Book).filter(models.Book.id == book_id).first()

    if not db_book:
        return {"message": "Book not found"}

    db_book.title = book.title
    db_book.author = book.author

    db.commit()
    db.refresh(db_book)

    return db_book


@app.delete("/books/{book_id}")
def delete_book(book_id: int, db: Session = Depends(get_db)):
    db_book = db.query(models.Book).filter(models.Book.id == book_id).first()

    if not db_book:
        return {"message": "Book not found"}

    db.delete(db_book)
    db.commit()

    return {"message": "Book deleted successfully"}