'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
        this.belongsTo(User, { foreignKey:'userId'})
    }
    toJSON(){
      return {...this.get(), id:undefined}
    }
  }
  Trip.init({
    tid: 
    {
      type:DataTypes.STRING,
    defaultValue:DataTypes.UUIDV4
    },
    source: {
      type:DataTypes.STRING,
      allowNull:false
    },
    destination: {
      type:DataTypes.STRING,
      allowNull:false
    },
    accomodation: {
      type:DataTypes.STRING,
      allowNull:false
    },
    dep_date: {
      type:DataTypes.STRING,
      allowNull:false
    },
    ret_date: {
      type:DataTypes.STRING,
      allowNull:false
    },
    reason: {
      type:DataTypes.STRING,
      allowNull:false
    },
    status: {
      type:DataTypes.STRING,
      defaultValue:"Pending"
    },
    userId: {
      type:DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'trips',
    modelName: 'Trip',
  });
  return Trip;
};