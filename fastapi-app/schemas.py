from pydantic import BaseModel

class BookCreate(BaseModel):
    title: str
    author: str


class Book(BookCreate):
    id: int

    class Config:
        from_attributes = True


class UserCreate(BaseModel):
    username: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str