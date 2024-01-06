# API Documentation

## Models :

_User_

- username : string (optional)
- email : string, unique (required)
- password : string (required)
- role: string (default: staff)
- phoneNumber: string
- address: string

_Category_

- name : string (required)

_Product_

- name : string (required)
- description : string (required)
- price : integer (required)
- stock : integer
- imgUrl : string
- categoryId : integer (required)
- authorId : integer (required)

## Relationship :

### **Many-to-Many**

## Endpoints :

List of available endpoints:
​

- `POST /add-user`
- `POST /login`
- `POST /categories`
- `GET /categories`
- `PUT /categories/:id`
- `DELETE /categories/:id`
- `POST /products`
- `GET /products`
- `GET /products/:id`
- `PUT /products/:id`
- `DELETE /products/:id`

&nbsp;

## 1. POST /add-user

Request:

- headers:

```json
{
  "Authorization": "Admin only",
  "Authentication": "Bearer <access_token>"
}
```

- body:

```json
{
  "username": "staff",
  "email": "staff@mail.com",
  "password": "staff",
  "phoneNumber": "08212121",
  "address": "Indonesia"
}
```

_Response (201 - Created)_

```json
{
  "id": 1,
  "username": "staff",
  "email": "staff@mail.com"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email cannot empty"
}
OR
{
  "message": "Formated email required"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password cannot empty"
}
OR
{
  "message": "Minimum password is 5 characters"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "admin@mail.com",
  "password": "admin"
}
```

_Response (200 - OK)_
​

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTcwNDQ3NjQ5MH0.BEOqMbG6dj3fGv1oyAUMLou6PF0rPSZouo8WeLysJTI"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email cannot empty"
}
OR
{
  "message": "Password cannot empty"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email and password"
}
```

&nbsp;

## 3. POST /categories

Request:

- headers:

```json
{
  "Authentication": "Bearer <access_token>"
}
```

- body:

```json
{
  "name": "Glove"
}
```

_Response (201 - Created)_
​

```json
{
  "id": 1,
  "name": "Glove",
  "updatedAt": "2024-01-05T17:46:50.005Z",
  "createdAt": "2024-01-05T17:46:50.005Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name cannot empty"
}
```

&nbsp;

## 4. GET /categories
Description: Get all categories

Request:

- headers:

```json
{
  "Authentication": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "Glove",
        "createdAt": "2024-01-04T08:18:39.446Z",
        "updatedAt": "2024-01-04T08:18:39.446Z"
    },
    {
        "id": 2,
        "name": "Shoe",
        "createdAt": "2024-01-04T08:18:39.446Z",
        "updatedAt": "2024-01-04T08:18:39.446Z"
    }
    ...
]
```

&nbsp;

## 5. PUT /categories/:id
Description: Update specific category based on id

Request:

- headers:

```json
{
  "Authentication": "Bearer <access_token>"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

_Response (200 - OK)_

```json
{
  "id": 1,
  "name": "Glove",
  "createdAt": "2024-01-04T08:18:39.446Z",
  "updatedAt": "2024-01-05T18:02:33.194Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "not found"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name cannot empty"
}
```

&nbsp;

## 6. DELETE /categories/:id
Description: Delete specific category based on id

Request:

- headers:

```json
{
  "Authentication": "Bearer <access_token>"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

_Response (200 - OK)_

```json
{
  "message": "Glove success to delete"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "not found"
}
```

&nbsp;

## 7. POST /products

Request:

- headers:

```json
{
  "Authentication": "Bearer <access_token>"
}
```

- body:

```json
{
  "name": "Black Glove",
  "description": "Glove with black color",
  "price": 10000,
  "stock": 100,
  "imgUrl": "image_glove",
  "categoryId": 1
}
```

_Response (201 - Created)_
​

```json
{
  "id": 1,
  "name": "Black Glove",
  "description": "Glove with black color",
  "price": 10000,
  "stock": 100,
  "imgUrl": "image_glove",
  "categoryId": 1,
  "createdAt": "2024-01-05T18:08:48.953Z",
  "updatedAt": "2024-01-05T18:08:48.953Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name cannot empty"
}
OR
{
  "message": "Description cannot empty"
}
OR
{
  "message": "Price cannot empty"
}
OR
{
  "message": "Price must be above 1000"
}
OR
{
  "message": "Category Id cannot empty"
}
```

&nbsp;

## 8. GET /products
Description: Get all products

Request:

- headers:

```json
{
  "Authentication": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "Black Glove",
        "description": "Glove with black color",
        "price": 1000000,
        "stock": 10,
        "imgUrl": "image_glove",
        "categoryId": 1,
        "authorId": 2,
        "createdAt": "2024-01-04T15:54:50.588Z",
        "updatedAt": "2024-01-04T15:54:50.588Z",
        "User": {
            "id": 2,
            "username": "staff",
            "email": "staff@mail.com",
            "role": "Staff",
            "phoneNumber": "08212121",
            "address": "indonesia",
            "createdAt": "2024-01-04T08:21:28.564Z",
            "updatedAt": "2024-01-04T08:21:28.564Z"
        }
    },
    {
        "id": 2,
        "name": "White Glove",
        "description": "Glove with white color",
        "price": 1000000,
        "stock": 10,
        "imgUrl": "image_glove",
        "categoryId": 1,
        "authorId": 1,
        "createdAt": "2024-01-04T16:01:39.714Z",
        "updatedAt": "2024-01-04T16:01:39.714Z",
        "User": {
            "id": 1,
            "username": "admin",
            "email": "admin@mail.com",
            "role": "Admin",
            "phoneNumber": "08212121",
            "address": "indonesia",
            "createdAt": "2024-01-04T08:18:39.519Z",
            "updatedAt": "2024-01-04T08:18:39.519Z"
        }
    }
    ...
]
```

&nbsp;

## 9. GET /products/:id
Description: Get specific product based on id

Request:

- headers:

```json
{
  "Authentication": "Bearer <access_token>"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "name": "Black Glove",
  "description": "Glove with black color",
  "price": 1000000,
  "stock": 10,
  "imgUrl": "image_glove",
  "categoryId": 1,
  "authorId": 2,
  "createdAt": "2024-01-04T15:54:50.588Z",
  "updatedAt": "2024-01-04T15:54:50.588Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "not found"
}
```

&nbsp;

## 10. PUT /products/:id
Description: Update specific product based on id (Admin can update all products while staff can only update their own)

Request:

- headers:

```json
{
  "Authentication": "Bearer <access_token>",
  "Authorization": "Admin and Staff"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "name": "Black Glove",
  "description": "Glove with black color",
  "price": 10000,
  "stock": 100,
  "imgUrl": "image_glove",
  "categoryId": 1
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "name": "Black Glove",
  "description": "Glove with black color",
  "price": 10000,
  "stock": 100,
  "imgUrl": "image_glove",
  "categoryId": 1,
  "authorId": 2,
  "createdAt": "2024-01-04T15:54:50.588Z",
  "updatedAt": "2024-01-05T18:32:48.198Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "not found"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name cannot empty"
}
OR
{
  "message": "Description cannot empty"
}
OR
{
  "message": "Price must be above 1000"
}
OR
{
  "message": "Category Id cannot empty"
}
```

&nbsp;

## 11. DELETE /products/:id
Description: Delete specific product based on id (Admin can delete all products while staff can only delete their own)

Request:

- headers:

```json
{
  "Authentication": "Bearer <access_token>",
  "Authorization": "Admin and Staff"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

_Response (200 - OK)_

```json
{
  "message": "Black Glove success to delete"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "not found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Unathorized"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
