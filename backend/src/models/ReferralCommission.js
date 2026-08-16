const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ReferralCommission = sequelize.define('ReferralCommission', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    referrerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    referredUserId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    investmentAmount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    commissionAmount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    commissionRate: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 4.00,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'paid'),
      defaultValue: 'pending',
    },
  }, {
    timestamps: true,
    underscored: true,
  });

  ReferralCommission.associate = (models) => {
    ReferralCommission.belongsTo(models.User, { foreignKey: 'referrerId', as: 'referrer' });
    ReferralCommission.belongsTo(models.User, { foreignKey: 'referredUserId', as: 'referred' });
  };

  return ReferralCommission;
};
