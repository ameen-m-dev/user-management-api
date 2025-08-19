const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { 
  validateProfileUpdate, 
  handleValidationErrors,
  sanitizeInput 
} = require('../middleware/validation');

// GET /api/users/profile - Get current user profile (Protected)
router.get('/profile',
  authenticateToken,
  userController.getProfile
);

// PUT /api/users/profile - Update user profile (Protected)
router.put('/profile',
  authenticateToken,
  sanitizeInput,
  validateProfileUpdate,
  handleValidationErrors,
  userController.updateProfile
);

// GET /api/users - Admin: list all users (Protected + Admin)
router.get('/',
  authenticateToken,
  requireAdmin,
  userController.getAllUsers
);

// DELETE /api/users/:id - Admin: delete user (Protected + Admin)
router.delete('/:id',
  authenticateToken,
  requireAdmin,
  userController.deleteUser
);

// GET /api/users/stats - Get user registration statistics (Protected + Admin)
router.get('/stats',
  authenticateToken,
  requireAdmin,
  userController.getUserStats
);

module.exports = router;
