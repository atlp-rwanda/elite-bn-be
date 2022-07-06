/* eslint-disable  */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rates.init({
    accomodationId: DataTypes.INTEGER,
    userId: DataTypes.UUID,
    serviceRate: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rates',
  });
  return Rates;
};