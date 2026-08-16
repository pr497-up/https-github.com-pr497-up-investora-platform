const cron = require('node-cron');
const { ReferralCommission, Transaction, User, Notification } = require('../models');
const { logger } = require('../app');

const processReferralCommissions = async () => {
  try {
    const pendingCommissions = await ReferralCommission.findAll({
      where: { status: 'pending' },
    });

    for (const commission of pendingCommissions) {
      // Approve and create transaction
      commission.status = 'paid';
      await commission.save();

      // Add to user balance
      const user = await User.findByPk(commission.referrerId);
      user.balance = parseFloat(user.balance) + parseFloat(commission.commissionAmount);
      await user.save();

      // Create transaction
      await Transaction.create({
        userId: commission.referrerId,
        type: 'commission',
        amount: commission.commissionAmount,
        status: 'completed',
      });

      // Create notification
      await Notification.create({
        userId: commission.referrerId,
        type: 'commission_received',
        title: 'Comissão Recebida',
        message: `Comissão de ${commission.commissionAmount} Kz recebida de seu indicado.`,
      });
    }

    return { processed: pendingCommissions.length };
  } catch (error) {
    logger.error('Referral commission job failed:', error);
    throw error;
  }
};

const startReferralCommissionJob = () => {
  // Run every 6 hours
  cron.schedule('0 */6 * * *', async () => {
    try {
      logger.info('Starting referral commission processing job...');
      const result = await processReferralCommissions();
      logger.info(`Processed ${result.processed} referral commissions`);
    } catch (error) {
      logger.error('Referral commission job failed:', error);
    }
  });

  logger.info('Referral commission cron job scheduled');
};

module.exports = { startReferralCommissionJob };
