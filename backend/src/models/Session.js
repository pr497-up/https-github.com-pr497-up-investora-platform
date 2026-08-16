const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Session = sequelize.define('Session', {
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
    token: {
      type: DataTypes.STRING(500),
      allowNull: false,
      unique: true,
    },
    ipAddress: {
      type: DataTypes.STRING(45),
    },
    userAgent: {
      type: DataTypes.STRING(500),
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    timestamps: true,
    underscored: true,
  });

  Session.associate = (models) => {
    Session.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Session;
};
