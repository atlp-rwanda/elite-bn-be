'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({request}) {
      // define association here
      this.hasMany(request, {foreignKey:"tripId"})
    }
  }
  trip.init({
    tripId: 
      {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
        },
    origin: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter origin'
      }
    },
    destination:{
      allowNull: {
        args: false,
        msg: 'Please enter destination'
      }
    }
  }, {
    sequelize,
    modelName: 'trip',
  });
  return trip;
};