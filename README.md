
## Project Name : Prime Wash
Express js and Typescript booking platform api project
## Tech Stack

- Runtime & Framework: Node.js, Express.js (v5)
- Language: TypeScript
- Database: MongoDB, Mongoose
- Authentication & Security: bcrypt, jsonwebtoken (JWT), cookie-parser, cors
- Validation: zod
- File Uploads & Media: multer, cloudinary
- Networking & Utilities: axios, dotenv, http-status

## API documentation
### Bsae Url : `https://prime-wash-backend.vercel.app`
### 1. SignUp User
#### Endpoint : `/api/v1/user` (POST)
#### Request Headers:
```
Content-Type: multipart/form-data
```
 #### Sample Request Body:
```
| Name | Type | Description |
|---|---|---|
| name | text | Rahat Khan |
| email | text | rahatkhan@gamil.com |
| phone | text | 01723456789 |
| password | text | 123456 |
| address | text | Dhaka,Bangladesh |
| file| file | The profile image to be uploaded. |
```
#### Sample Response:
```
{
    "success": true,
    "message": "User create successfully",
    "data": {
        "name": "Rahat Khan",
        "email": "rahatkhan@gamil.com",
        "image": "https://res.cloudinary.com/dmhfrwdq3/image/upload/v1758701822/file.png",
        "password": "",
        "phone": "01723456789",
        "address": "Dhaka,Bangladesh",
        "role": "user",
        "isDelete": false,
        "_id": "68d3a9017cc22b5c90a66da2",
        "createdAt": "2025-09-24T08:17:05.647Z",
        "updatedAt": "2025-09-24T08:17:05.647Z",
        "__v": 0
    }
}
```
### 2. Login 
#### Endpoint : `/api/v1/auth/login` (POST)
#### Sample Request Body:
```
{
    "email": "rahatkhan@gamil.com",
    "password": "123456"
}
```
#### Sample Response:
```
{
    "success": true,
    "message": "Login successfully",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGQzYTkwMTdjYzIyYjVjOTBhNjZkYTIiLCJlbWFpbCI6InJhaGF0a2hhbkBnYW1pbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTc1ODcwMjIwNiwiZXhwIjoxNzU4Nzg4NjA2fQ.-DckIq9LMHn43sUOMV9-vGEuPO8xQEJnWRrX9PDIdOQ"
    }
}
```
### 3. Get all users (Only Accessible by Admin)
#### Endpoint : `/api/v1/user` (GET)
#### Request Headers:
```

Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGJmZGRkNzYwMjcxYWYwZmMwOWFiMjIiLCJlbWFpbCI6ImFicmFobWFuMjAwMWFAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU4NzAyMzgwLCJleHAiOjE3NTg3ODg3ODB9.vSjKu_OZyiCDh1aBWIvavQ4wQ0cffX7updhhaCyprn4

```
#### Sample Response:
```
{
    "success": true,
    "message": "Get all user successfully",
    "data": [
        {
            "_id": "68d3a9017cc22b5c90a66da2",
            "name": "Rahat Khan",
            "email": "rahatkhan@gamil.com",
            "image": "https://res.cloudinary.com/dmhfrwdq3/image/upload/v1758701822/file.png",
            "phone": "01723456789",
            "address": "Dhaka,Bangladesh",
            "role": "user",
            "isDelete": false,
            "createdAt": "2025-09-24T08:17:05.647Z",
            "updatedAt": "2025-09-24T08:17:05.647Z",
            "__v": 0
        }
        // ... more data
    ]
}
```
### 4. Delete a users (Only Accessible by Admin)
#### Endpoint : `/api/v1/user/:id` (DELETE)
#### Request Headers:
```

Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGJmZGRkNzYwMjcxYWYwZmMwOWFiMjIiLCJlbWFpbCI6ImFicmFobWFuMjAwMWFAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU4NzAyMzgwLCJleHAiOjE3NTg3ODg3ODB9.vSjKu_OZyiCDh1aBWIvavQ4wQ0cffX7updhhaCyprn4

```
#### Sample Response:
```
{
    "success": true,
    "message": "Get all user successfully",
    "data": [
        {
            "_id": "68d3a9017cc22b5c90a66da2",
            "name": "Rahat Khan",
            "email": "rahatkhan@gamil.com",
            "image": "https://res.cloudinary.com/dmhfrwdq3/image/upload/v1758701822/file.png",
            "phone": "01723456789",
            "address": "Dhaka,Bangladesh",
            "role": "user",
            "isDelete": false,
            "createdAt": "2025-09-24T08:17:05.647Z",
            "updatedAt": "2025-09-24T08:17:05.647Z",
            "__v": 0
        }
        // ... more data
    ]
}
```
### 5. Refresh token to access token (Only login User and admin)
#### Endpoint : `api/v1/auth/refresh-token` (POST)

#### Sample Response:
```
{
    "success": true,
    "message": "Access token create successfully",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGJmZGRkNzYwMjcxYWYwZmMwOWFiMjIiLCJlbWFpbCI6ImFicmFobWFuMjAwMWFAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU4NzAyNjg5LCJleHAiOjE3NTg3ODkwODl9.z-KEdp18lZq11AhXYpyhE9pVZlVF-u5QZgr14cVqcEs"
    }
}
```

### 6. Google login data save and provide token
#### Endpoint : `/api/v1/auth/google-login` (POST)

#### Sample Request Body:
```
{
    name: name (get from google authentication)
    email: email (get from google authentication)
    image:image url (get from google authentication)
}

```

#### Sample Response:
```
{
    "success": true,
    "message": "Login successfully",
    "data": {
        "accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGJmZGRkNzYwMjcxYWYwZmMwOWFiMjIiLCJlbWFpbCI6ImFicmFobWFuMjAwMWFAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU4NzAyNjg5LCJleHAiOjE3NTg3ODkwODl9.z-KEdp18lZq11AhXYpyhE9pVZlVF-u5QZgr14cVqcEs"
    }
}
```
### 7. Password change (Only Login User)
#### Endpoint : `/api/v1/auth/password-change` (PUT)

#### Request Headers:
```

Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGQzYTkwMTdjYzIyYjVjOTBhNjZkYTIiLCJlbWFpbCI6InJhaGF0a2hhbkBnYW1pbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTc1ODcwNDM1MSwiZXhwIjoxNzU4NzkwNzUxfQ.va5AWPZAtQfUcJ14bWUpFvJEufU-uqhSI28XqYN6Ik8

```
#### Sample Request Body:
```
{
    "oldPassword":"123456",
    "password":"user1234"
}
```
#### Sample Response:
```
{
    "success": true,
    "message": "Password change successfully",
    "data": {
        "_id": "68d3a9017cc22b5c90a66da2",
        "name": "Rahat Khan",
        "email": "rahatkhan@gamil.com",
        "image": "https://res.cloudinary.com/dmhfrwdq3/image/upload/v1758701822/file.png",
        "phone": "01723456789",
        "address": "Dhaka,Bangladesh",
        "role": "user",
        "isDelete": false,
        "createdAt": "2025-09-24T08:17:05.647Z",
        "updatedAt": "2025-09-24T09:00:42.467Z",
        "__v": 0
    }
}
```
### 8.Get User Profile (Only Login User)
#### Endpoint : `/api/v1/auth/profile` (GET)

#### Request Headers:
```

Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGQzYTkwMTdjYzIyYjVjOTBhNjZkYTIiLCJlbWFpbCI6InJhaGF0a2hhbkBnYW1pbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTc1ODcwNDM1MSwiZXhwIjoxNzU4NzkwNzUxfQ.va5AWPZAtQfUcJ14bWUpFvJEufU-uqhSI28XqYN6Ik8

```
#### Sample Response:
```
{
    "success": true,
    "message": "Get user profile successfully",
    "data": {
        "_id": "68d3a9017cc22b5c90a66da2",
        "name": "Rahat Khan",
        "email": "rahatkhan@gamil.com",
        "image": "https://res.cloudinary.com/dmhfrwdq3/image/upload/v1758701822/file.png",
        "phone": "01723456789",
        "address": "Dhaka,Bangladesh",
        "role": "user",
        "isDelete": false,
        "createdAt": "2025-09-24T08:17:05.647Z",
        "updatedAt": "2025-09-24T09:00:42.467Z",
        "__v": 0
    }
}
```
### 9. Update User Profile(Only Login User)
#### Endpoint : `/api/v1/auth/profile` (PATCH)
#### Request Headers:
```
Content-Type: multipart/form-data
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGNlNmY2Nzk5MzRjNTczMTgxZjQxMzEiLCJlbWFpbCI6ImFicmFobWFuMjAwMWFAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU4NDcyMDYxLCJleHAiOjE3NTg1NTg0NjF9.m7dQ4BHxUkLN4AB2c9dJzAadBFDwTXZzAX3mMDAk7Rs

```
#### Sample Request Body:
```
All file are (optional)

| Name | Type | Description |
|---|---|---|
| name | text | Md. Rahat Khan | 
| phone | text | 01723456780 |
| address | text |Mirpur, Dhaka,Bangladesh |
| file| file | The profile image to be uploaded. |
```

#### Sample Response:
```
{
    "success": true,
    "message": "Update profile successfully",
    "data": {
        "_id": "68d3a9017cc22b5c90a66da2",
        "name": "Md. Rahat Khan",
        "email": "rahatkhan@gamil.com",
        "image": "https://res.cloudinary.com/dmhfrwdq3/image/upload/v1758701822/file.png",
        "phone": "01723456780",
        "address": "Mirpur,Dhaka,Bangladesh",
        "role": "user",
        "isDelete": false,
        "createdAt": "2025-09-24T08:17:05.647Z",
        "updatedAt": "2025-09-24T09:00:42.467Z",
        "__v": 0
    }
}

```
### 10. Create service(Only Accessible by Admin)
#### Endpoint : `/api/v1/service` (POST)
#### Request Headers:
```
Content-Type: multipart/form-data
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGJmZGRkNzYwMjcxYWYwZmMwOWFiMjIiLCJlbWFpbCI6ImFicmFobWFuMjAwMWFAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU4NzE2NDUzLCJleHAiOjE3NTg4MDI4NTN9.MUUt8KZcasmNejr8SrZWePpM1MDrT94B6Rx_3FQv6co
```
#### Sample Request Body:
```
| Name | Type | Description |
|---|---|---|
| name | text | Basic Exterior Wash | 
| description | text | Quick exterior wash including soap, rinse, and dry |
| price | text | 300 |
| dureation | text | 20 |
| file| file | The service image to be uploaded. |
```
#### Sample Response:
```
{
    "success": true,
    "message": "Service create successfully",
    "data": {
        "name": "Basic Exterior Wash",
        "description": "Quick exterior wash including soap, rinse, and dry",
        "price": 300,
        "duration": "15",
        "image": "https://res.cloudinary.com/dmhfrwdq3/image/upload/v1758717063/file.png",
        "isDeleted": false,
        "_id": "68d3e4867cc22b5c90a66db5",
        "createdAt": "2025-09-24T12:31:02.205Z",
        "updatedAt": "2025-09-24T12:31:02.205Z",
        "__v": 0
    }
}
```
### 11. Get All Services
#### Endpoint : `/api/v1/service` (GET)
#### Query Parameters(Optional) : `?searchTerm=""&duration=""&maxPrice=""`
#### Sample Response:
```
{
    "success": true,
    "message": "Get all services successfully",
    "data": [
        {
            "_id": "68aed4129ee78a9ba6621774",
            "name": "Premium Detailing",
            "description": "Complete detailing service with wax, polish, and interior shampoo.",
            "price": 1500,
            "duration": "45",
            "image": "https://res.cloudinary.com/dmhfrwdq3/image/upload/v1756298799/car-3_s6kdps.png",
            "isDeleted": false,
            "__v": 0
        },
      <!-- more data -->
    ]
}
```


### 12. Get a service
#### Endpoint : `/api/v1/service/:id` (GET)
#### Sample Response:
```
{
    "success": true,
    "message": "Get service successfully",
    "data":  {
            "_id": "68d3e4867cc22b5c90a66db5",
            "name": "Basic Exterior Wash",
            "description": "Quick exterior wash including soap, rinse, and dry",
            "price": 300,
            "duration": "15",
            "image": "https://res.cloudinary.com/dmhfrwdq3/image/upload/v1758717063/file.png",
            "isDeleted": false,
            "createdAt": "2025-09-24T12:31:02.205Z",
            "updatedAt": "2025-09-24T12:31:02.205Z",
            "__v": 0
        },
}
```
### 13.Update a service(Only Accessible by Admin)
#### Endpoint : `/api/v1/product/:id` (PATCH)
#### Request Headers:
```
Content-Type: multipart/form-data
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGJmZGRkNzYwMjcxYWYwZmMwOWFiMjIiLCJlbWFpbCI6ImFicmFobWFuMjAwMWFAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU4NzE2NDUzLCJleHAiOjE3NTg4MDI4NTN9.MUUt8KZcasmNejr8SrZWePpM1MDrT94B6Rx_3FQv6co
```
#### Sample Request Body:
```
(name,price,description, duration,file) filed are(Optional) for Update

| Name | Type | Description |
|---|---|---|
| name | text | Basic Exterior Wash new | 
| price | text | 350 |
| dureation | text | 25 |
```
#### Sample Response:
```
{
    "success": true,
    "message":"Update service successfully",
    "data": {
        "name": "Basic Exterior Wash new",
        "description": "Quick exterior wash including soap, rinse, and dry",
        "price": 350,
        "duration": "25",
        "image": "https://res.cloudinary.com/dmhfrwdq3/image/upload/v1758717063/file.png",
        "isDeleted": false,
        "_id": "68d3e4867cc22b5c90a66db5",
        "createdAt": "2025-09-24T12:31:02.205Z",
        "updatedAt": "2025-09-24T12:44:02.205Z",
        "__v": 0
    }
}
```
### 14.Delete a service (Only Accessible by Admin)
#### Endpoint : `/api/v1/service/:id` (DELETE)
#### Request Headers:
```
Content-Type: multipart/form-data
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGJmZGRkNzYwMjcxYWYwZmMwOWFiMjIiLCJlbWFpbCI6ImFicmFobWFuMjAwMWFAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU4NzE2NDUzLCJleHAiOjE3NTg4MDI4NTN9.MUUt8KZcasmNejr8SrZWePpM1MDrT94B6Rx_3FQv6co

```

#### Sample Response:
```
{
    "success": true,
    "message": "Service delete successfully",
    "date": {
    "success": true,
    "message":"Update service successfully",
    "data": {
        "name": "Basic Exterior Wash new",
        "description": "Quick exterior wash including soap, rinse, and dry",
        "price": 350,
        "duration": "25",
        "image": "https://res.cloudinary.com/dmhfrwdq3/image/upload/v1758717063/file.png",
        "isDeleted": false,
        "_id": "68d3e4867cc22b5c90a66db5",
        "createdAt": "2025-09-24T12:31:02.205Z",
        "updatedAt": "2025-09-24T12:44:02.205Z",
        "__v": 0
    }
}

```
### 15.Create a Slot (Only Accessible by Admin)
#### Endpoint : `/api/v1/slot` (POST)
#### Request Headers:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGJmZGRkNzYwMjcxYWYwZmMwOWFiMjIiLCJlbWFpbCI6ImFicmFobWFuMjAwMWFAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU4NzE2NDUzLCJleHAiOjE3NTg4MDI4NTN9.MUUt8KZcasmNejr8SrZWePpM1MDrT94B6Rx_3FQv6co

```
#### Sample Request Body:
```
{
    "service": "68aed4129ee78a9ba6621774",
    "date": "2025-09-28",
    "startTime": "11:00",
    "endTime": "14:00"
}
```

#### Sample Response:
```
{
    "success": true,
    "message": "Slot create success successfully",
    "data": [
        {
            "service": "68aed4129ee78a9ba6621774",
            "date": "2025-09-28",
            "startTime": "11:00",
            "endTime": "11:45",
            "isBooked": "available",
            "_id": "68d3febd7cc22b5c90a66dc3",
            "createdAt": "2025-09-24T14:22:53.661Z",
            "updatedAt": "2025-09-24T14:22:53.661Z",
            "__v": 0
        },
        {
            "service": "68aed4129ee78a9ba6621774",
            "date": "2025-09-28",
            "startTime": "11:45",
            "endTime": "12:30",
            "isBooked": "available",
            "_id": "68d3febd7cc22b5c90a66dc4",
            "createdAt": "2025-09-24T14:22:53.661Z",
            "updatedAt": "2025-09-24T14:22:53.661Z",
            "__v": 0
        },
        {
            "service": "68aed4129ee78a9ba6621774",
            "date": "2025-09-28",
            "startTime": "12:30",
            "endTime": "13:15",
            "isBooked": "available",
            "_id": "68d3febd7cc22b5c90a66dc5",
            "createdAt": "2025-09-24T14:22:53.661Z",
            "updatedAt": "2025-09-24T14:22:53.661Z",
            "__v": 0
        },
        {
            "service": "68aed4129ee78a9ba6621774",
            "date": "2025-09-28",
            "startTime": "13:15",
            "endTime": "14:00",
            "isBooked": "available",
            "_id": "68d3febd7cc22b5c90a66dc6",
            "createdAt": "2025-09-24T14:22:53.664Z",
            "updatedAt": "2025-09-24T14:22:53.664Z",
            "__v": 0
        }
    ]
}
```
### 16.Get all slot
#### Endpoint : `/api/v1/slot` (GET)
#### Query Parameters(Optional) : `?date="2025-08-29"&service=serviceId`
#### Request Headers:

#### Sample Response:
```
{
    "success": true,
    "message": "Get all slot successfully",
    "data": [
        {
            "_id": "68c40d1a146bbc88aa95027a",
            "service": {
                "_id": "68aed4129ee78a9ba6621774",
                "name": "Premium Detailing",
                "description": "Complete detailing service with wax, polish, and interior shampoo.",
                "price": 1500,
                "duration": "45",
                "image": "https://res.cloudinary.com/dmhfrwdq3/image/upload/v1756298799/car-3_s6kdps.png",
                "isDeleted": false,
                "__v": 0
            },
            "date": "2025-09-13",
            "startTime": "10:00",
            "endTime": "10:45",
            "isBooked": "booked",
            "createdAt": "2025-09-12T12:07:54.768Z",
            "updatedAt": "2025-09-12T12:10:40.034Z",
            "__v": 0
        },
        <!-- more data -->
    ]

}
```
### 17. Update a slot (Only Accessible by Admin)
#### Endpoint : `/api/v1/slot/:id` (PUT)
#### Request Headers:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGJmZGRkNzYwMjcxYWYwZmMwOWFiMjIiLCJlbWFpbCI6ImFicmFobWFuMjAwMWFAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU4NzE2NDUzLCJleHAiOjE3NTg4MDI4NTN9.MUUt8KZcasmNejr8SrZWePpM1MDrT94B6Rx_3FQv6co

```
#### Sample Request Body:
```
{
     "isBooked": "booked",
}
```

#### Sample Response:
```
{
    "success": true,
    "message": "Slot update successfully",
    "data": {
            "service": "68aed4129ee78a9ba6621774",
            "date": "2025-09-28",
            "startTime": "11:00",
            "endTime": "11:45",
            "isBooked": "booked",
            "_id": "68d3febd7cc22b5c90a66dc3",
            "createdAt": "2025-09-24T14:22:53.661Z",
            "updatedAt": "2025-09-24T14:22:59.661Z",
            "__v": 0
        },
}
```
### 18.Delete a slot (Only Accessible by Admin)
#### Endpoint : `/api/v1/slot/:id` (DELETE)
#### Request Headers:
```

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGJmZGRkNzYwMjcxYWYwZmMwOWFiMjIiLCJlbWFpbCI6ImFicmFobWFuMjAwMWFAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU4NzE2NDUzLCJleHAiOjE3NTg4MDI4NTN9.MUUt8KZcasmNejr8SrZWePpM1MDrT94B6Rx_3FQv6co

```

#### Sample Response:
```
{
    "success": true,
    "message": "Delete slot successfully",
    "data":   {
            "service": "68aed4129ee78a9ba6621774",
            "date": "2025-09-28",
            "startTime": "11:45",
            "endTime": "12:30",
            "isBooked": "available",
            "_id": "68d3febd7cc22b5c90a66dc4",
            "createdAt": "2025-09-24T14:22:53.661Z",
            "updatedAt": "2025-09-24T14:22:53.661Z",
            "__v": 0
        },
}
```
### 19. Payment related api 
#### Endpoint : `/api/v1/payment` (POST)(Login User)(Body pass amount,name,email)
#### Endpoint : `/api/v1/payment/success` (POST)
#### Endpoint : `/api/v1/fail` (GET)
#### Endpoint : `/api/v1/cancle` (GET)

### 20.Booking a service (Login User)
#### Endpoint : `/api/v1/booking` (POST)
#### Request Headers:
```

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGJmZGRkNzYwMjcxYWYwZmMwOWFiMjIiLCJlbWFpbCI6ImFicmFobWFuMjAwMWFAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU4NzE2NDUzLCJleHAiOjE3NTg4MDI4NTN9.MUUt8KZcasmNejr8SrZWePpM1MDrT94B6Rx_3FQv6co

```
#### Sample Request Body:
```
{
  "customer": "68bfddd760271af0fc09ab22", 
  "service": "68aed4129ee78a9ba6621774", 
  "slot": "68d3febd7cc22b5c90a66dc5", 
  "vehicleType": "Car",
  "vehicleBrand": "Toyota",
  "vehicleModel": "Corolla",
  "registrationPlate": "ABC-1234",
  "paymentStatus": "unpaid"
}
```

#### Sample Response:
```
{
    "success": true,
    "message": "Successfully Booking",
    "data": {
        "customer": "68bfddd760271af0fc09ab22",
        "service": "68aed4129ee78a9ba6621774",
        "slot": "68d3febd7cc22b5c90a66dc5",
        "vehicleType": "Car",
        "vehicleBrand": "Toyota",
        "vehicleModel": "Corolla",
        "registrationPlate": "ABC-1234",
        "paymentStatus": "unpaid",
        "_id": "68d408383cf34b989b56b6e6",
        "createdAt": "2025-09-24T15:03:20.984Z",
        "updatedAt": "2025-09-24T15:03:20.984Z",
        "__v": 0
    }
}

```
### 21.Get all booking (Only Accessible by Admin)
#### Endpoint : `/api/v1/booking` (GET)
#### Request Headers:
```

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGJmZGRkNzYwMjcxYWYwZmMwOWFiMjIiLCJlbWFpbCI6ImFicmFobWFuMjAwMWFAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU4NzE2NDUzLCJleHAiOjE3NTg4MDI4NTN9.MUUt8KZcasmNejr8SrZWePpM1MDrT94B6Rx_3FQv6co

```

#### Sample Response:
```
{
    "success": true,
    "message": "Get all booking successfully",
    "data":[
     {
        "customer": "68bfddd760271af0fc09ab22",
        "service": "68aed4129ee78a9ba6621774",
        "slot": "68d3febd7cc22b5c90a66dc5",
        "vehicleType": "Car",
        "vehicleBrand": "Toyota",
        "vehicleModel": "Corolla",
        "registrationPlate": "ABC-1234",
        "paymentStatus": "unpaid",
        "_id": "68d408383cf34b989b56b6e6",
        "createdAt": "2025-09-24T15:03:20.984Z",
        "updatedAt": "2025-09-24T15:03:20.984Z",
        "__v": 0
    },
    <!-- more booking data-->
  ]
}
```
### 22.Get Login user all booking (Login User)
#### Endpoint : `/api/v1/booking/my-booking` (GET)
#### Request Headers:
```

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGNlNmY2Nzk5MzRjNTczMTgxZjQxMzEiLCJlbWFpbCI6ImFicmFobWFuMjAwMWFAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU4NDcyMDYxLCJleHAiOjE3NTg1NTg0NjF9.m7dQ4BHxUkLN4AB2c9dJzAadBFDwTXZzAX3mMDAk7Rs

```

#### Sample Response:
```
{
    "success": true,
    "message": "Get my booking booking successfully",
    "data":[
     {
        "customer": "68bfddd760271af0fc09ab22",
        "service": "68aed4129ee78a9ba6621774",
        "slot": "68d3febd7cc22b5c90a66dc5",
        "vehicleType": "Car",
        "vehicleBrand": "Toyota",
        "vehicleModel": "Corolla",
        "registrationPlate": "ABC-1234",
        "paymentStatus": "unpaid",
        "_id": "68d408383cf34b989b56b6e6",
        "createdAt": "2025-09-24T15:03:20.984Z",
        "updatedAt": "2025-09-24T15:03:20.984Z",
        "__v": 0
    },
    <!-- more booking data-->
  ]
}
```
### 23.Get Login user all upcoming booking (Login User)
#### Endpoint : `/api/v1/booking/my-upcoming-booking` (GET)
#### Request Headers:
```

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGNlNmY2Nzk5MzRjNTczMTgxZjQxMzEiLCJlbWFpbCI6ImFicmFobWFuMjAwMWFAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU4NDcyMDYxLCJleHAiOjE3NTg1NTg0NjF9.m7dQ4BHxUkLN4AB2c9dJzAadBFDwTXZzAX3mMDAk7Rs

```

#### Sample Response:
```
{
    "success": true,
    "message": "Get my upcoming booking successfully",
    "data":[
     {
        "customer": "68bfddd760271af0fc09ab22",
        "service": "68aed4129ee78a9ba6621774",
        "slot": "68d3febd7cc22b5c90a66dc5",
        "vehicleType": "Car",
        "vehicleBrand": "Toyota",
        "vehicleModel": "Corolla",
        "registrationPlate": "ABC-1234",
        "paymentStatus": "unpaid",
        "_id": "68d408383cf34b989b56b6e6",
        "createdAt": "2025-09-24T15:03:20.984Z",
        "updatedAt": "2025-09-24T15:03:20.984Z",
        "__v": 0
    },
    <!-- if more -->
    <!-- more upcoming booking data-->
  ]
}
```
### 24.Delete a booking (Only Accessible by Admin)
#### Endpoint : `/api/v1/booking` (DELETE)
#### Request Headers:
```

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGJmZGRkNzYwMjcxYWYwZmMwOWFiMjIiLCJlbWFpbCI6ImFicmFobWFuMjAwMWFAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU4NzE2NDUzLCJleHAiOjE3NTg4MDI4NTN9.MUUt8KZcasmNejr8SrZWePpM1MDrT94B6Rx_3FQv6co

```

#### Sample Response:
```
{
    "success": true,
    "message":"Delete a booking successfully",
    "data": {
        "customer": "68bfddd760271af0fc09ab22",
        "service": "68aed4129ee78a9ba6621774",
        "slot": "68d3febd7cc22b5c90a66dc5",
        "vehicleType": "Car",
        "vehicleBrand": "Toyota",
        "vehicleModel": "Corolla",
        "registrationPlate": "ABC-1234",
        "paymentStatus": "unpaid",
        "_id": "68d408383cf34b989b56b6e6",
        "createdAt": "2025-09-24T15:03:20.984Z",
        "updatedAt": "2025-09-24T15:03:20.984Z",
        "__v": 0
    }
}
```
### 25.Provice a Review (Lgoin User)
#### Endpoint : `/api/v1/review` (POST)
#### Request Headers:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGNlNmY2Nzk5MzRjNTczMTgxZjQxMzEiLCJlbWFpbCI6ImFicmFobWFuMjAwMWFAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU4NDcyMDYxLCJleHAiOjE3NTg1NTg0NjF9.m7dQ4BHxUkLN4AB2c9dJzAadBFDwTXZzAX3mMDAk7Rs

```
#### Sample Request Body:
```
{
  "user": "651f49349d4f0c1234567001",
  "rating": 5,
  "comment": "Excellent service! The staff was very professional and my car looks brand new.",
}

```

#### Sample Response:
```
{
  "_id": "6520a1f89d4f0c1234567890",
  "user": "651f49349d4f0c1234567001",
  "rating": 5,
  "comment": "Excellent service! The staff was very professional and my car looks brand new.",
  "createdAt": "2025-09-24T15:30:00.000Z",
  "updatedAt": "2025-09-24T15:30:00.000Z",
  "__v": 0
}
```
### 26.Get all reviews 
#### Endpoint : `/api/v1/review` (GET)
#### Request Headers:

#### Sample Response:
```
{
    "success": true,
    "message": "Review get successfully",
    "data":[
      {
        "_id": "6520a1f89d4f0c1234567890",
        "user": "651f49349d4f0c1234567001",
        "rating": 5,
        "comment": "Excellent service! The staff was very professional and my car looks brand new.",
        "createdAt": "2025-09-24T15:30:00.000Z",
        "updatedAt": "2025-09-24T15:30:00.000Z",
        "__v": 0
      },
    <!-- more review -->
    ]
}
```
