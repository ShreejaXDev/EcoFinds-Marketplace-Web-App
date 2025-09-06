const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');
const { authenticateToken, generateToken } = require('../middleware/auth');

const router = express.Router();

// Register new user
router.post('/register', [
  body('displayName').trim().isLength({ min: 2, max: 50 }).withMessage('Display name must be between 2 and 50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { displayName, email, password } = req.body;

    // Check if user already exists
    const [existingUsers] = await db.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user
    const [result] = await db.execute(
      'INSERT INTO users (display_name, email, password_hash) VALUES (?, ?, ?)',
      [displayName, email, passwordHash]
    );

    const userId = result.insertId;

    // Generate JWT token
    const token = generateToken(userId);

    // Get user data (without password)
    const [newUser] = await db.execute(
      'SELECT id, display_name, email, profile_image, is_verified, created_at FROM users WHERE id = ?',
      [userId]
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: newUser[0]
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed'
    });
  }
});

// Login user
router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user
    const [users] = await db.execute(
      'SELECT id, display_name, email, password_hash, profile_image, is_verified, created_at FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const user = users[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = generateToken(user.id);

    // Remove password hash from response
    const { password_hash, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
});

// Verify JWT token and get user data
router.post('/verify', authenticateToken, async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Token verification failed'
    });
  }
});

// Get current user profile
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const [users] = await db.execute(
      'SELECT id, display_name, email, profile_image, is_verified, created_at FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user: users[0]
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile'
    });
  }
});

// Refresh token
router.post('/refresh', authenticateToken, async (req, res) => {
  try {
    const newToken = generateToken(req.user.id);

    res.json({
      success: true,
      token: newToken,
      user: req.user
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({
      success: false,
      message: 'Token refresh failed'
    });
  }
});

module.exports = router;