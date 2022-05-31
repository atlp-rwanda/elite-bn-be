'use strict';
const {
  Model
} = require('sequelize');
const bcryptjs = require('bcryptjs');
const { hash } = bcryptjs;
export default (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      // define association here
    }
  }
  user.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    image: DataTypes.STRING,
    passwordChangedAt: DataTypes.DATE,
    passwordResetExpires: DataTypes.DATE,
    passwordResetToken: DataTypes.STRING,
    socialMediaId: DataTypes.STRING,
    provider: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
    gender: DataTypes.STRING,
    preferredLanguage: DataTypes.STRING,
    role: DataTypes.ENUM(
      'manager',
      'super user',
      'requester',
      'super admin',
      'travel admin',
      'travel team member',
      'accommodation supplier'
    )
  }, {
    sequelize,
    modelName: 'users',
  });

  user.beforeSave(async user => {
    if (user.password) {
      user.password = await hash(user.password, 12);
    }

  });

  return user;
};