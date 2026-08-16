const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const LoginLog = sequelize.define('LoginLog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    phone: {
      type: DataTypes.STRING(20),
    },
    ipAddress: {
      type: DataTypes.STRING(45),
    },
    userAgent: {
      type: DataTypes.STRING(500),
    },
    success: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    reason: {
      type: DataTypes.STRING(255),
    },
  }, {
    timestamps: true,
    underscored: true,
  });

  LoginLog.associate = (models) => {
    LoginLog.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return LoginLog;
};
