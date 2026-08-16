const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Investment = sequelize.define('Investment', {
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
    planNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    investmentAmount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    dailyIncome: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    activationDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    completionDate: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.ENUM('active', 'completed', 'cancelled'),
      defaultValue: 'active',
    },
    totalEarned: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0,
    },
  }, {
    timestamps: true,
    underscored: true,
  });

  Investment.associate = (models) => {
    Investment.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Investment;
};
