'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({user,trip}) {
      // define association here
      this.belongsTo(user, { foreignKey:'id'})
      this.belongsTo(trip, { foreignKey:'tripId'})

    }
  }
  request.init({
    requestId:{
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
    },
    departureDate: {
      type: DataTypes.DATE,
      allowNull: {
        args: false,
        msg: 'Please select dep date'
      }
    },
    returnDate:{
      type: DataTypes.DATE,
      allowNull: {
        args: false,
        msg: 'Please select return date'
      }
    },
    travelingReason: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please provide travelling reason'
      }
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Pending"
    },
    type: DataTypes.STRING,
    handledBy: DataTypes.STRING,
    id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    tripId: 
      {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
        }


  }, 
  {
    sequelize,
    modelName: 'request',
  });
  return request;
};