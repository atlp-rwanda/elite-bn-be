/* eslint-disable  */
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rates extends Model {
    static associate(models) {}
  }
  Rates.init(
    {
      tripperId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      accommodationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      serviceRating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Rates',
    }
  );
  return Rates;
};
