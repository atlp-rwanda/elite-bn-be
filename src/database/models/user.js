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
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    birthdate: DataTypes.STRING,
    gender: DataTypes.STRING,
    address: DataTypes.STRING,
    department: DataTypes.STRING,
    image: DataTypes.STRING,
    preferredLanguage: DataTypes.STRING,
    preferredCurrency: DataTypes.STRING,
    lineManager: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Users',
  });
  return User;
};