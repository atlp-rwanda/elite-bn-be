/*eslint-disable*/
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('super admin', 'travel admin', 'accommodation supplier', 'manager', 'requester'),
    gender: DataTypes.STRING,
    phone: DataTypes.STRING,
    image: DataTypes.STRING,
    birthdate: DataTypes.STRING,
    nationality: DataTypes.STRING,
    preferredLanguage: DataTypes.STRING,
    preferredCurrency: DataTypes.STRING,
    department: DataTypes.STRING,
    lineManager: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return User;
};

