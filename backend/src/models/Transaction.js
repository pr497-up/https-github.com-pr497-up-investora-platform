const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Transaction = sequelize.define('Transaction', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    type: {
      type: DataTypes.ENUM('deposit', 'withdrawal', 'commission', 'daily_income'),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    fee: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0,
    },
    netAmount: {
      type: DataTypes.DECIMAL(15, 2),
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected', 'completed'),
      defaultValue: 'pending',
    },
    proofImageUrl: {
      type: DataTypes.STRING(500),
    },
    adminNotes: {
      type: DataTypes.TEXT,
    },
    bankName: {
      type: DataTypes.STRING(100),
    },
    iban: {
      type: DataTypes.STRING(50),
    },
    accountHolder: {
      type: DataTypes.STRING(255),
    },
    approvedAt: {
      type: DataTypes.DATE,
    },
    approvedBy: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }, {
    timestamps: true,
    underscored: true,
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Transaction;
};
