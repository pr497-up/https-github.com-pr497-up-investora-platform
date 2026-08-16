const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { Transaction, User } = require('../models');

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get user transactions
 *     security:
 *       - bearerAuth: []
 */
router.get('/', authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { userId: req.user.userId },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/transactions/withdrawal:
 *   post:
 *     summary: Request withdrawal
 *     security:
 *       - bearerAuth: []
 */
router.post('/withdrawal', authMiddleware, async (req, res) => {
  try {
    const { amount, bankName, iban, accountHolder } = req.body;

    if (amount < 1500) {
      return res.status(400).json({ error: 'Minimum withdrawal is 1500 Kz' });
    }

    const user = await User.findByPk(req.user.userId);
    if (parseFloat(user.balance) < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    const fee = amount * 0.08; // 8% fee
    const netAmount = amount - fee;

    const transaction = await Transaction.create({
      userId: req.user.userId,
      type: 'withdrawal',
      amount,
      fee,
      netAmount,
      bankName,
      iban,
      accountHolder,
      status: 'pending',
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
