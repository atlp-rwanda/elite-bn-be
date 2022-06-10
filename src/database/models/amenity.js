'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Amenity extends Model {
    static associate(models) {
      Amenity.belongsTo(models.Accomodation, {
        foreignKey: 'accommodationId',
        as: 'accommodation',
      });
    }
  }
  Amenity.init(
    {
      accommodationId: DataTypes.INTEGER,
      wifi: DataTypes.BOOLEAN,
      televison: DataTypes.BOOLEAN,
      smokeDetector: DataTypes.BOOLEAN,
      ironing: DataTypes.BOOLEAN,
      fireExtenguisher: DataTypes.BOOLEAN,
      airConditional: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Amenity',
    }
  );
  return Amenity;
};
