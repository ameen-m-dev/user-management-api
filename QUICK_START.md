# 🚀 Quick Start Guide - User Management API

## Immediate Setup & Testing

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
```bash
# Copy environment file
cp env.example .env
```

### 3. Create Admin User
```bash
npm run create-admin
```
**Admin Credentials:**
- Email: `admin@example.com`
- Password: `AdminPass123!`

### 4. Start Server
```bash
# Development mode (auto-restart)
npm run dev

# Production mode
npm start
```

### 5. Test API Endpoints

#### Health Check
```bash
curl -X GET http://localhost:3000/api/health
```

#### Register New User
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

#### Login User
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

#### Get Profile (with token)
```bash
curl -X GET http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

#### Admin: Get All Users
```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN_HERE"
```

## 🎯 PayPal Interview Features Demonstrated

✅ **RESTful API Design** - Proper HTTP methods and status codes  
✅ **JWT Authentication** - Secure token-based authentication  
✅ **Password Security** - Bcrypt hashing with 12 rounds  
✅ **Input Validation** - Comprehensive validation and sanitization  
✅ **Role-Based Access** - Admin and user roles with authorization  
✅ **Rate Limiting** - 100 requests per hour per IP  
✅ **Security Headers** - Helmet.js for security  
✅ **Error Handling** - Consistent JSON error responses  
✅ **Database Integration** - SQLite with proper connection handling  
✅ **Professional Documentation** - Complete README and API docs  

## 📊 API Endpoints Summary

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/health` | Health check | No |
| POST | `/api/auth/register` | Register user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | Yes |
| GET | `/api/users/profile` | Get profile | Yes |
| PUT | `/api/users/profile` | Update profile | Yes |
| GET | `/api/users` | Get all users | Admin |
| DELETE | `/api/users/:id` | Delete user | Admin |
| GET | `/api/users/stats` | User statistics | Admin |

## 🔧 Testing with Postman

1. Import `postman_collection.json` into Postman
2. Set environment variables:
   - `baseUrl`: `http://localhost:3000/api`
   - `authToken`: (will be auto-set after login)
   - `adminToken`: (set manually after admin login)

## 🚨 Security Features

- **Password Requirements**: 8+ chars, uppercase, lowercase, number, special char
- **JWT Expiration**: 24 hours (configurable)
- **Rate Limiting**: 100 requests/hour per IP
- **CORS Protection**: Configurable origins
- **SQL Injection Prevention**: Parameterized queries
- **Input Sanitization**: All inputs trimmed and validated

## 📁 Project Structure

```
user-management-api/
├── src/
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth & validation
│   ├── models/         # Database operations
│   ├── routes/         # API endpoints
│   ├── database/       # Database connection
│   └── app.js         # Main application
├── scripts/           # Utility scripts
├── database.sqlite    # SQLite database
├── package.json       # Dependencies
├── README.md         # Full documentation
└── postman_collection.json # API testing
```

## 🎉 Ready for PayPal Interview!

This project demonstrates enterprise-level backend development skills:
- Clean, maintainable code architecture
- Comprehensive security implementation
- Professional API design
- Proper error handling and validation
- Production-ready configuration
- Complete documentation and testing setup

Perfect for showcasing your backend expertise and security awareness!
