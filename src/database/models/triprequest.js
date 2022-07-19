/* eslint-disable require-jsdoc */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tripRequest extends Model {
    static associate(models) {

      tripRequest.belongsTo(models.Users, {
        foreignKey: {
          name: 'tripperId',
        },
        as: 'requester',
      });
      tripRequest.belongsTo(models.Location, {
        foreignKey: {
          name: 'to',
        },
        as: 'destination',
      });
      tripRequest.belongsTo(models.Accomodation, {
        foreignKey: {
          name: 'accommodationId',
        },
        as: 'accommodation',
      });
    }
  }
  tripRequest.init(
    {
      tripperId: DataTypes.INTEGER,
      from: DataTypes.STRING,
      to: DataTypes.INTEGER,
      departDate: DataTypes.STRING,
      returnDate: DataTypes.STRING,
      tripReasons: DataTypes.STRING,
      tripType: DataTypes.STRING,
      tripStatus: DataTypes.ENUM('pending', 'approved', 'rejected'),
      accommodationId: DataTypes.INTEGER,
      passportNumber: DataTypes.STRING,
      passportName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'tripRequest',
    }
  );
  module.exports = tripRequest;
  return tripRequest;
};
