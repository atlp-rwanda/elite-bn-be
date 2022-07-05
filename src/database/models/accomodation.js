const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Accomodation extends Model {
    static associate(models) {
      Accomodation.hasMany(models.Room, {
        foreignKey: 'accomodationId',
        onUpdate: 'CASCADE',
      });
      Accomodation.belongsTo(models.Location, {
        foreignKey: 'locationId',
      });
      Accomodation.hasOne(models.Amenity, {
        foreignKey: 'accommodationId',
        as: 'Amenity',
        onDelete: 'cascade',
      });
    }
  }
  Accomodation.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      accomodationName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      accomodationDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      locationId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      accomodationImage: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      amenities: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Accomodation',
    }
  );
  return Accomodation;
};
