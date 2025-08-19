const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const { 
  validateRegistration, 
  validateLogin, 
  handleValidationErrors,
  sanitizeInput 
} = require('../middleware/validation');

// POST /api/auth/register - Create new user account
router.post('/register', 
  sanitizeInput,
  validateRegistration,
  handleValidationErrors,
  authController.register
);

// POST /api/auth/login - User login
router.post('/login',
  sanitizeInput,
  validateLogin,
  handleValidationErrors,
  authController.login
);

// POST /api/auth/logout - Logout user (requires authentication)
router.post('/logout',
  authenticateToken,
  authController.logout
);

module.exports = router;
