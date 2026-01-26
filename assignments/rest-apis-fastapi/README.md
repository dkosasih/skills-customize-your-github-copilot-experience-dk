# 📘 Assignment: REST APIs with FastAPI

## 🎯 Objective

Learn to build RESTful APIs using the FastAPI framework, including creating endpoints, handling HTTP methods, validating data, and working with path and query parameters.

## 📝 Tasks

### 🛠️ Create a Book Catalog API

#### Description
Build a REST API that manages a book catalog with endpoints to create, read, update, and delete books. Each book should have a title, author, year published, and ISBN.

#### Requirements
Completed program should:

- Define a Book model using Pydantic with appropriate data types and validation
- Implement a GET endpoint `/books` to retrieve all books
- Implement a GET endpoint `/books/{isbn}` to retrieve a specific book by ISBN
- Implement a POST endpoint `/books` to add a new book to the catalog
- Implement a PUT endpoint `/books/{isbn}` to update an existing book
- Implement a DELETE endpoint `/books/{isbn}` to remove a book from the catalog
- Return appropriate HTTP status codes (200, 201, 404, etc.)
- Include proper error handling for invalid requests


### 🛠️ Add Search and Filter Functionality

#### Description
Extend the API with query parameters to search and filter books by various criteria.

#### Requirements
Completed program should:

- Add query parameters to the `/books` endpoint to filter by author
- Add query parameters to filter by publication year range
- Add a query parameter to limit the number of results returned
- Return an empty list when no books match the criteria
- Validate query parameters and return meaningful error messages for invalid inputs
