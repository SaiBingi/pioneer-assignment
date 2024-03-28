## UserModel

The `userModel` defines the schema for the user collection in the MongoDB database.

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;



This API documentation outlines the endpoints and scenarios for interacting with the backend.

Installation

Clone the repository: git clone <repository_url>
Navigate to the project directory: cd <project_directory>
Install dependencies: npm install

Running the Server
To start the server, run the following command:

nodemon app.js

API Endpoints

1. User Registration
Path: /register/
Method: POST
Description: Registers a new user.
Request Body:

{
  "name": "Sai Bingi",
  "username": "sai_bingi",
  "email": "saibingi@gmail.com",
  "password": "sai@123",
  "gender": "male"
}

Scenarios:
If the username or email already exists:
Response: 400 Bad Request
Body: "Username or email already exists"
If the provided gender is not valid:
Response: 400 Bad Request
Body: "Please select a valid gender"
Successful registration of the user:
Response: 201 Created
Body: "User registered successfully"

2. User Login
Path: /login/
Method: POST
Description: Logs in an existing user.
Request Body:
{
  "username": "sai_bingi",
  "password": "sai@123"
}

Scenarios:
If the user does not exist:
Response: 404 Not Found
Body: "User not found"
If the provided password is incorrect:
Response: 401 Unauthorized
Body: "Invalid password"
Successful login of the user:
Response: 200 OK
Body: { "token": "<JWT_TOKEN>" }

3. User Logout
Path: /logout
Method: POST
Description: Logs out the currently authenticated user.

4. Protected Endpoint
Path: /protected
Method: GET
Description: Accessible only to authenticated users.
Headers: Authorization: Bearer <JWT_TOKEN>
Scenarios:
If the JWT token is invalid or not provided:
Response: 401 Unauthorized
Body: "Invalid JWT Token"
If the JWT token is valid:
Response: 200 OK
Body: "This is a protected endpoint with UserId <USER_ID>"

5. Get Data
Path: /data
Method: GET
Description: Fetches data from a public API based on query parameters.
Query Parameters: category (optional), limit (optional)


6. API Documentation
Path: /api-docs
Method: GET
Description: Returns the API documentation in Swagger UI format.
