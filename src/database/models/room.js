'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      Room.belongsTo(models.Accomodation, {
        foreignKey: 'accomodationId',
        timestamp: true,
      });
      Room.hasMany(models.BookingRoom, {
        foreignKey: 'roomId',
      });
    }
  }
  Room.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      accomodationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      roomNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bedType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cost: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      isBooked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Room',
    }
  );
  return Room;
};
