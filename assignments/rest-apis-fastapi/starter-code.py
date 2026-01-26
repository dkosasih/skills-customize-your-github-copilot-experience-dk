"""
FastAPI Book Catalog Starter Code
Complete the TODO sections to build a REST API for managing books.
"""

from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel, Field
from typing import Optional, List

app = FastAPI(title="Book Catalog API")

# TODO: Define the Book model with appropriate fields and validation
class Book(BaseModel):
    title: str
    author: str
    year: int
    isbn: str

# In-memory storage for books (in a real app, you'd use a database)
books_db: List[Book] = []


# TODO: Implement GET /books endpoint to retrieve all books
# Add optional query parameters for filtering (author, year_min, year_max, limit)
@app.get("/books")
async def get_books():
    pass


# TODO: Implement GET /books/{isbn} endpoint to retrieve a specific book
@app.get("/books/{isbn}")
async def get_book(isbn: str):
    pass


# TODO: Implement POST /books endpoint to add a new book
@app.post("/books", status_code=201)
async def create_book(book: Book):
    pass


# TODO: Implement PUT /books/{isbn} endpoint to update an existing book
@app.put("/books/{isbn}")
async def update_book(isbn: str, book: Book):
    pass


# TODO: Implement DELETE /books/{isbn} endpoint to remove a book
@app.delete("/books/{isbn}", status_code=204)
async def delete_book(isbn: str):
    pass


# Run with: uvicorn starter-code:app --reload
