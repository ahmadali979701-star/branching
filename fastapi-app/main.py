from fastapi import FastAPI
from database import engine, Base
import models

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Library Management API",
    version="1.0.0"
)

@app.get("/")
def root():
    return {"message": "Library API Running"}

@app.get("/health")
def health():
    return {"status": "OK"}