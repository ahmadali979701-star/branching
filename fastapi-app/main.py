from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Welcome to the Library Management API"}

@app.get("/books")
def get_books():
    return [
        {
            "id": 1,
            "title": "Python Basics",
            "author": "John Doe"
        },
        {
            "id": 2,
            "title": "Learning FastAPI",
            "author": "Jane Smith"
        }
    ]