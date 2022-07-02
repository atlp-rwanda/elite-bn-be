const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate(models) {
      Location.hasMany(models.Accomodation, {
        foreignKey: 'locationId',
        as: 'Accomodations',
        onDelete: 'cascade',
      });
      Location.belongsTo(models.Country, {
        foreignKey: 'countryId',
      });
    }
  }
  Location.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      locationName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      locationDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      countryId: {
        type: DataTypes.INTEGER,
        onDelete: 'cascade',
        onUpdate: 'cascade',
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      link: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Location',
    }
  );
  return Location;
};
