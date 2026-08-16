const cron = require('node-cron');
const { calculateDailyIncome } = require('../services/investmentService');
const { logger } = require('../app');

const startDailyIncomeJob = () => {
  // Run every day at 00:00 UTC
  cron.schedule('0 0 * * *', async () => {
    try {
      logger.info('Starting daily income distribution job...');
      const result = await calculateDailyIncome();
      logger.info(`Daily income distributed to ${result.processed} investments`);
    } catch (error) {
      logger.error('Daily income job failed:', error);
    }
  });

  logger.info('Daily income cron job scheduled');
};

module.exports = { startDailyIncomeJob };
