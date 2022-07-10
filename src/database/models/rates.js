/* eslint-disable  */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rates extends Model {
    static associate(models) {
      
      Rates.belongsTo(models.tripRequest, {
        foreignKey: {
          name: 'tripperId',
        },
        as: 'requester',
      });

      Rates.belongsTo(models.Accomodation, {
        foreignKey: {
          name: 'accommodationId',
        },
        as: 'accommodation',
      });
    }
  }
  Rates.init(
    {

        accomodationId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        tripperId: {
          type: DataTypes.UUID,
          unique: true,
          allowNull: false
        },
        serviceRating: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
      },
  {
    sequelize,
    modelName: 'Rates',
    tableName: 'rates'
  });
  return Rates;
};