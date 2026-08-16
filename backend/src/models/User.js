const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    fullName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    referralCode: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
    },
    referredBy: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    balance: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 1000.00,
      validate: {
        min: 0,
      },
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    blockReason: {
      type: DataTypes.STRING(255),
    },
    failedLoginAttempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    lastFailedLogin: {
      type: DataTypes.DATE,
    },
    lastLogin: {
      type: DataTypes.DATE,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    timestamps: true,
    underscored: true,
  });

  User.associate = (models) => {
    User.hasMany(models.Investment, { foreignKey: 'userId', as: 'investments' });
    User.hasMany(models.Transaction, { foreignKey: 'userId', as: 'transactions' });
    User.hasMany(models.Session, { foreignKey: 'userId', as: 'sessions' });
    User.hasMany(models.LoginLog, { foreignKey: 'userId', as: 'loginLogs' });
    User.hasMany(models.Notification, { foreignKey: 'userId', as: 'notifications' });
    User.hasMany(models.ReferralCommission, { foreignKey: 'referrerId', as: 'referrals' });
    User.hasMany(models.ReferralCommission, { foreignKey: 'referredUserId', as: 'commissions' });
  };

  return User;
};
