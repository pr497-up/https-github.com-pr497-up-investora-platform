const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { User, Transaction, Investment, AdminLog } = require('../models');

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     security:
 *       - bearerAuth: []
 */
router.get('/users', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['passwordHash'] },
      include: [
        { model: Investment, as: 'investments' },
        { model: Transaction, as: 'transactions' },
      ],
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/admin/approve-deposit:
 *   post:
 *     summary: Approve deposit (Admin only)
 *     security:
 *       - bearerAuth: []
 */
router.post('/approve-deposit', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { transactionId } = req.body;
    const transaction = await Transaction.findByPk(transactionId);

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    transaction.status = 'approved';
    transaction.approvedAt = new Date();
    transaction.approvedBy = req.user.userId;
    await transaction.save();

    // Update user balance
    const user = await User.findByPk(transaction.userId);
    user.balance = parseFloat(user.balance) + parseFloat(transaction.amount);
    await user.save();

    // Log admin action
    await AdminLog.create({
      adminId: req.user.userId,
      action: 'approve_deposit',
      targetUserId: transaction.userId,
      details: { transactionId, amount: transaction.amount },
    });

    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/admin/block-user:
 *   post:
 *     summary: Block user (Admin only)
 *     security:
 *       - bearerAuth: []
 */
router.post('/block-user', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { userId, reason } = req.body;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.isBlocked = true;
    user.blockReason = reason;
    await user.save();

    await AdminLog.create({
      adminId: req.user.userId,
      action: 'block_user',
      targetUserId: userId,
      details: { reason },
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
