const User = require('../models/User');
const { generateToken } = require('../middleware/auth');

// Store for blacklisted tokens (in production, use Redis)
const blacklistedTokens = new Set();

const register = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;

    // Check if user already exists
    const existingUserByEmail = await User.findByEmail(email);
    if (existingUserByEmail) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered',
        error: 'EMAIL_EXISTS'
      });
    }

    const existingUserByUsername = await User.findByUsername(username);
    if (existingUserByUsername) {
      return res.status(409).json({
        success: false,
        message: 'Username already taken',
        error: 'USERNAME_EXISTS'
      });
    }

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password,
      firstName,
      lastName
    });

    // Generate JWT token
    const token = generateToken(newUser.id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName
        },
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.message.includes('already exists')) {
      return res.status(409).json({
        success: false,
        message: error.message,
        error: 'DUPLICATE_ENTRY'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error during registration',
      error: 'INTERNAL_ERROR'
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
        error: 'INVALID_CREDENTIALS'
      });
    }

    // Verify password
    const isValidPassword = await User.verifyPassword(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
        error: 'INVALID_CREDENTIALS'
      });
    }

    // Generate JWT token
    const token = generateToken(user.id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: User.toPublicJSON(user),
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during login',
      error: 'INTERNAL_ERROR'
    });
  }
};

const logout = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      // Add token to blacklist
      blacklistedTokens.add(token);
    }

    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during logout',
      error: 'INTERNAL_ERROR'
    });
  }
};

// Helper function to check if token is blacklisted
const isTokenBlacklisted = (token) => {
  return blacklistedTokens.has(token);
};

module.exports = {
  register,
  login,
  logout,
  isTokenBlacklisted
};
