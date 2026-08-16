const { app, logger } = require('./app');
const { sequelize } = require('./models');
const { startDailyIncomeJob } = require('./jobs/dailyIncome');
const { startReferralCommissionJob } = require('./jobs/referralCommission');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    logger.info('Database connection established successfully.');

    // Sync database (in production, use migrations)
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    logger.info('Database synchronized.');

    // Start cron jobs
    startDailyIncomeJob();
    startReferralCommissionJob();
    logger.info('Cron jobs started.');

    // Start server
    app.listen(PORT, () => {
      logger.info(`🚀 INVESTORA API running on port ${PORT}`);
      console.log(`\n✅ Server started successfully at http://localhost:${PORT}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/api/docs\n`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
