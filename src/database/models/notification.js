'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Users.hasMany(Notification, {
        foreignKey: 'addedBy',
        onDelete: 'CASCADE',
      });
      Notification.belongsTo(models.Users, {
        foreignKey: 'addedBy',
      });
      Notification.belongsTo(models.tripRequest, {
        foreignKey: 'tripId',
      });
    }
  }
  Notification.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      type: {
        type: DataTypes.ENUM('email', 'application'),
        defaultValue: 'application',
      },

      category: {
        type: DataTypes.ENUM('created', 'updated', 'status', 'comment'),
        allowNull: false,
      },

      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: 'false',
      },

      tripId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      addedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Notification',
    }
  );
  return Notification;
};
