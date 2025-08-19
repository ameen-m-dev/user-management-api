# User Management REST API

A professional REST API for user authentication and management built with Node.js, Express, and SQLite. Perfect for PayPal interview projects demonstrating backend expertise, security awareness, and professional API development skills.

## 🚀 Features

- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **User Management**: CRUD operations for user profiles
- **Role-Based Access Control**: Admin and user roles with proper authorization
- **Security**: Rate limiting, CORS, helmet security headers, input validation
- **Database**: SQLite with automatic schema creation
- **Validation**: Comprehensive input validation and sanitization
- **Error Handling**: Consistent JSON error responses with proper HTTP status codes
- **Logging**: Request logging with Morgan
- **Health Monitoring**: API health check endpoint

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd user-management-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy the environment example file
   cp env.example .env
   
   # Edit .env with your configuration
   nano .env
   ```

4. **Start the server**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:3000` by default.

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# Database Configuration
DB_PATH=./database.sqlite

# Rate Limiting
RATE_LIMIT_WINDOW_MS=3600000
RATE_LIMIT_MAX_REQUESTS=100

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Security
BCRYPT_ROUNDS=12
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

#### 1. Register User
**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 2. Login User
**POST** `/auth/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 3. Logout User
**POST** `/auth/logout`

Logout user (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### User Management Endpoints (Protected)

#### 4. Get User Profile
**GET** `/users/profile`

Get current user's profile information.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

#### 5. Update User Profile
**PUT** `/users/profile`

Update current user's profile information.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "firstName": "John Updated",
  "lastName": "Doe Updated",
  "email": "john.updated@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "id": 1,
      "firstName": "John Updated",
      "lastName": "Doe Updated",
      "email": "john.updated@example.com"
    }
  }
}
```

### Admin Endpoints (Admin Role Required)

#### 6. Get All Users
**GET** `/users`

Get list of all users (admin only).

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": 1,
        "username": "john_doe",
        "email": "john@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "role": "user",
        "created_at": "2024-01-01T00:00:00.000Z",
        "updated_at": "2024-01-01T00:00:00.000Z"
      }
    ],
    "count": 1
  }
}
```

#### 7. Delete User
**DELETE** `/users/:id`

Delete a user by ID (admin only).

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": {
    "deletedUserId": 1
  }
}
```

#### 8. Get User Statistics
**GET** `/users/stats`

Get user registration statistics (admin only).

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "total": 10,
      "today": 2,
      "thisWeek": 5,
      "thisMonth": 8
    }
  }
}
```

### Utility Endpoints

#### 9. Health Check
**GET** `/health`

Check API health status.

**Response:**
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

## 🧪 Testing with cURL

### 1. Health Check
```bash
curl -X GET http://localhost:3000/api/health
```

### 2. Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "SecurePass123!",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### 3. Login User
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

### 4. Get Profile (with token)
```bash
curl -X GET http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### 5. Update Profile (with token)
```bash
curl -X PUT http://localhost:3000/api/users/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "firstName": "John Updated",
    "lastName": "Doe Updated"
  }'
```

### 6. Get All Users (admin token required)
```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN_HERE"
```

### 7. Get User Stats (admin token required)
```bash
curl -X GET http://localhost:3000/api/users/stats \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN_HERE"
```

### 8. Delete User (admin token required)
```bash
curl -X DELETE http://localhost:3000/api/users/1 \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN_HERE"
```

### 9. Logout
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## 🔒 Security Features

- **Password Hashing**: Bcrypt with configurable rounds (default: 12)
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: 100 requests per hour per IP
- **Input Validation**: Comprehensive validation and sanitization
- **CORS Protection**: Configurable CORS settings
- **Security Headers**: Helmet.js for security headers
- **SQL Injection Prevention**: Parameterized queries
- **Token Blacklisting**: Logout functionality

## 📊 Database Schema

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  role VARCHAR(20) DEFAULT 'user',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🏗️ Project Structure

```
user-management-api/
├── src/
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── userController.js    # User management logic
│   ├── middleware/
│   │   ├── auth.js             # JWT authentication middleware
│   │   └── validation.js       # Input validation middleware
│   ├── models/
│   │   └── User.js             # User model and database operations
│   ├── routes/
│   │   ├── auth.js             # Authentication routes
│   │   └── users.js            # User management routes
│   ├── database/
│   │   └── db.js               # Database connection and initialization
│   └── app.js                  # Main application file
├── database.sqlite             # SQLite database (auto-created)
├── package.json
├── env.example                 # Environment variables template
├── .gitignore
├── README.md
└── postman_collection.json     # Postman collection for testing
```

## 🚨 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "ERROR_CODE"
}
```

Common error codes:
- `VALIDATION_ERROR`: Input validation failed
- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `DUPLICATE_ENTRY`: Resource already exists
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_ERROR`: Server error

## 🔧 Creating Admin User

To create an admin user, you can manually update the database:

```sql
UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';
```

Or modify the registration logic in `authController.js` to set admin role for specific emails.

## 📝 Validation Rules

### Username
- 3-50 characters
- Letters, numbers, and underscores only

### Email
- Valid email format
- Normalized and trimmed

### Password
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

### Names
- 1-50 characters
- Letters and spaces only

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
JWT_SECRET=your-very-secure-production-secret
CORS_ORIGIN=https://yourdomain.com
```

### PM2 Deployment
```bash
npm install -g pm2
pm2 start src/app.js --name "user-management-api"
pm2 save
pm2 startup
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🎯 PayPal Interview Project

This project demonstrates:

- **RESTful API Design**: Proper HTTP methods and status codes
- **Authentication & Authorization**: JWT tokens with role-based access
- **Security Best Practices**: Password hashing, input validation, rate limiting
- **Database Integration**: SQLite with proper connection handling
- **Error Handling**: Consistent error responses
- **Professional Development**: Clean code structure and documentation
- **Enterprise-Ready Architecture**: Scalable and maintainable codebase

Perfect for showcasing backend development skills, security awareness, and professional API development capabilities.
