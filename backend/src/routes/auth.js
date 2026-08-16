const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../services/authService');
const { authMiddleware } = require('../middleware/auth');
const { User, Notification } = require('../models');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               fullName:
 *                 type: string
 *               password:
 *                 type: string
 *               referralCode:
 *                 type: string
 */
router.post('/register', async (req, res) => {
  try {
    const { phone, fullName, password, referralCode } = req.body;

    if (!phone || !fullName || !password || password.length !== 6) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const user = await register(phone, fullName, password, referralCode);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 */
router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    const ipAddress = req.ip;
    const userAgent = req.get('user-agent');

    if (!phone || !password) {
      return res.status(400).json({ error: 'Phone and password required' });
    }

    const user = await login(phone, password, ipAddress, userAgent);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     security:
 *       - bearerAuth: []
 */
router.post('/logout', authMiddleware, async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const { logout } = require('../services/authService');
    await logout(req.user.userId, token);
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
