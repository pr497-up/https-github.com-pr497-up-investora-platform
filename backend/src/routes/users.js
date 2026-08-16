const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { User, Investment, ReferralCommission, Transaction } = require('../models');

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     security:
 *       - bearerAuth: []
 */
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: { exclude: ['passwordHash'] },
      include: [
        { model: Investment, as: 'investments' },
        { model: ReferralCommission, as: 'referrals' },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/users/dashboard:
 *   get:
 *     summary: Get user dashboard data
 *     security:
 *       - bearerAuth: []
 */
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);
    const investments = await Investment.findAll({
      where: { userId: req.user.userId, status: 'active' },
    });

    const totalEarned = investments.reduce((sum, inv) => sum + parseFloat(inv.totalEarned), 0);
    const dailyIncome = investments.reduce((sum, inv) => sum + parseFloat(inv.dailyIncome), 0);
    const totalInvested = investments.reduce((sum, inv) => sum + parseFloat(inv.investmentAmount), 0);

    res.status(200).json({
      balance: user.balance,
      activeInvestments: investments.length,
      dailyIncome,
      totalInvested,
      totalEarned,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/users/referrals:
 *   get:
 *     summary: Get user referrals
 *     security:
 *       - bearerAuth: []
 */
router.get('/referrals', authMiddleware, async (req, res) => {
  try {
    const referrals = await ReferralCommission.findAll({
      where: { referrerId: req.user.userId },
      include: [{ model: User, as: 'referred', attributes: ['id', 'fullName', 'phone'] }],
    });

    res.status(200).json(referrals);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
