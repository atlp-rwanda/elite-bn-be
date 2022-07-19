'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookingRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BookingRoom.belongsTo(models.Users, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      BookingRoom.belongsTo(models.Room, {
        foreignKey: 'roomId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  BookingRoom.init(
    {
      roomId: DataTypes.STRING,
      from: DataTypes.DATE,
      to: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'BookingRoom',
    }
  );
  return BookingRoom;
};
