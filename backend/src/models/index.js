const Sequelize = require('sequelize');
const path = require('path');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'investora_db',
  process.env.DB_USER || 'investora_user',
  process.env.DB_PASSWORD || 'investora_password',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
      timestamps: true,
      underscored: true,
    },
  }
);

const db = {};

// Import models
db.User = require('./User')(sequelize);
db.Investment = require('./Investment')(sequelize);
db.Transaction = require('./Transaction')(sequelize);
db.Session = require('./Session')(sequelize);
db.LoginLog = require('./LoginLog')(sequelize);
db.Notification = require('./Notification')(sequelize);
db.AdminLog = require('./AdminLog')(sequelize);
db.ReferralCommission = require('./ReferralCommission')(sequelize);

// Setup associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
