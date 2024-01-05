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

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "Register Success",
  "id": "integer",
  "email": "string"
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
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_
​

```json
{
  "access_token": "string"
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
  "name": "string"
}
```

_Response (201 - Created)_
​

```json
{
  "message": "Add Category Success",
  "category": {
    "id": "integer",
    "name": "string",
    "updatedAt": "date",
    "createdAt": "date"
  }
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
        "id": "integer",
        "name": "string",
        "createdAt": "string",
        "updatedAt": "string"
    },
    {
        "id": "integer",
        "name": "string",
        "createdAt": "string",
        "updatedAt": "string"
    }
    ...
]
```

&nbsp;

## 5. PUT /categories/:id

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
  "id": "integer"
}
```

- body:

_Response (200 - OK)_

```json
{
  "message": "Update Success",
  "data": {
    "id": "integer",
    "name": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
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
  "id": "integer"
}
```

- body:

_Response (200 - OK)_

```json
{
  "data": {
    "id": "intger",
    "name": "string",
    "createdAt": "string",
    "updatedAt": "string"
  },
  "message": "<entity name> sucess to delete"
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
  "name": "string",
  "description": "string",
  "price": "integer",
  "stock": "integer",
  "imgUrl": "string",
  "categoryId": "integer"
}
```

_Response (201 - Created)_
​

```json
{
  "message": "Add Product Success",
  "id": "integer",
  "name": "string",
  "description": "string",
  "price": "integer",
  "stock": "integer",
  "imgUrl": "string",
  "createdAt": "date",
  "updatedAt": "date"
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
        "id": 10,
        "name": "Blue Pink Shirt",
        "description": "skipdulu",
        "price": 1000000,
        "stock": 10,
        "imgUrl": "skipdulu",
        "categoryId": 1,
        "authorId": 2,
        "createdAt": "2024-01-05T15:57:39.662Z",
        "updatedAt": "2024-01-05T15:57:39.662Z",
        "Category": {
            "id": 1,
            "name": "cek2",
            "createdAt": "2024-01-04T08:18:39.446Z",
            "updatedAt": "2024-01-05T13:10:53.062Z"
        },
        "User": {
            "id": 2,
            "username": "staff1",
            "email": "staff1@mail.com",
            "role": "Staff",
            "phoneNumber": "00000",
            "address": "dimana aja",
            "createdAt": "2024-01-04T08:21:28.564Z",
            "updatedAt": "2024-01-04T08:21:28.564Z"
        }
    },
    {
        "id": 9,
        "name": "Red Pink Shirt",
        "description": "skipdulu",
        "price": 1000000,
        "stock": 10,
        "imgUrl": "skipdulu",
        "categoryId": 1,
        "authorId": 2,
        "createdAt": "2024-01-05T13:47:30.786Z",
        "updatedAt": "2024-01-05T13:47:30.786Z",
        "Category": {
            "id": 1,
            "name": "cek2",
            "createdAt": "2024-01-04T08:18:39.446Z",
            "updatedAt": "2024-01-05T13:10:53.062Z"
        },
        "User": {
            "id": 2,
            "username": "staff1",
            "email": "staff1@mail.com",
            "role": "Staff",
            "phoneNumber": "00000",
            "address": "dimana aja",
            "createdAt": "2024-01-04T08:21:28.564Z",
            "updatedAt": "2024-01-04T08:21:28.564Z"
        }
    }
    ...
]
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
