const { Investment, Transaction, User, ReferralCommission } = require('../models');
const { PLANS } = require('./authService');

const createInvestment = async (userId, planNumber, depositAmount) => {
  try {
    if (!PLANS[planNumber]) {
      throw new Error('Invalid plan number');
    }

    const plan = PLANS[planNumber];

    if (depositAmount < plan.amount) {
      throw new Error(`Minimum investment for this plan is ${plan.amount} Kz`);
    }

    const investment = await Investment.create({
      userId,
      planNumber,
      investmentAmount: depositAmount,
      dailyIncome: plan.daily,
      activationDate: new Date(),
      status: 'active',
    });

    return investment;
  } catch (error) {
    throw new Error(`Failed to create investment: ${error.message}`);
  }
};

const getUserInvestments = async (userId) => {
  try {
    return await Investment.findAll({ where: { userId } });
  } catch (error) {
    throw new Error(`Failed to fetch investments: ${error.message}`);
  }
};

const completeInvestment = async (investmentId) => {
  try {
    const investment = await Investment.findByPk(investmentId);
    if (!investment) throw new Error('Investment not found');

    investment.status = 'completed';
    investment.completionDate = new Date();
    await investment.save();

    // Add completion notification
    const Notification = require('../models').Notification;
    await Notification.create({
      userId: investment.userId,
      type: 'investment_completed',
      title: 'Investimento Finalizado',
      message: `Seu investimento no plano ${PLANS[investment.planNumber].name} foi finalizado com sucesso. Valor total ganho: ${investment.totalEarned} Kz`,
    });

    return investment;
  } catch (error) {
    throw new Error(`Failed to complete investment: ${error.message}`);
  }
};

const calculateDailyIncome = async () => {
  try {
    const activeInvestments = await Investment.findAll({
      where: { status: 'active' },
      include: [{ model: User, as: 'User' }],
    });

    for (const investment of activeInvestments) {
      const dailyAmount = investment.dailyIncome;

      // Update investment total earned
      investment.totalEarned = parseFloat(investment.totalEarned) + parseFloat(dailyAmount);
      await investment.save();

      // Add transaction
      await Transaction.create({
        userId: investment.userId,
        type: 'daily_income',
        amount: dailyAmount,
        status: 'completed',
      });

      // Update user balance
      const user = await User.findByPk(investment.userId);
      user.balance = parseFloat(user.balance) + parseFloat(dailyAmount);
      await user.save();

      // Create notification
      const Notification = require('../models').Notification;
      await Notification.create({
        userId: investment.userId,
        type: 'daily_income',
        title: 'Renda Diária Creditada',
        message: `Renda diária de ${dailyAmount} Kz foi creditada à sua conta.`,
      });
    }

    return { processed: activeInvestments.length };
  } catch (error) {
    throw new Error(`Failed to calculate daily income: ${error.message}`);
  }
};

module.exports = {
  createInvestment,
  getUserInvestments,
  completeInvestment,
  calculateDailyIncome,
};
