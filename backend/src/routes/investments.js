const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { User, Investment, Transaction, Notification } = require('../models');
const { createInvestment } = require('../services/investmentService');

/**
 * @swagger
 * /api/investments:
 *   get:
 *     summary: Get user investments
 *     security:
 *       - bearerAuth: []
 */
router.get('/', authMiddleware, async (req, res) => {
  try {
    const investments = await Investment.findAll({
      where: { userId: req.user.userId },
    });
    res.status(200).json(investments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/investments/create:
 *   post:
 *     summary: Create new investment
 *     security:
 *       - bearerAuth: []
 */
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { planNumber, amount } = req.body;
    const investment = await createInvestment(req.user.userId, planNumber, amount);

    // Create notification
    await Notification.create({
      userId: req.user.userId,
      type: 'investment_created',
      title: 'Investimento Criado',
      message: `Investimento de ${amount} Kz criado com sucesso. Aguardando aprovação do admin.`,
    });

    res.status(201).json(investment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
