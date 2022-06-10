'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.CachedInfo, {
        foreignKey: 'userId',
        as: 'cachedInfo',
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        unique: true,
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      role: DataTypes.ENUM(
        'super admin',
        'travel admin',
        'accommodation supplier',
        'manager',
        'requester'
      ),

      gender: DataTypes.STRING,
      phone: DataTypes.STRING,
      image: DataTypes.STRING,
      birthdate: DataTypes.STRING,
      nationality: DataTypes.STRING,
      preferredLanguage: DataTypes.STRING,
      preferredCurrency: DataTypes.STRING,
      department: DataTypes.STRING,
      lineManager: DataTypes.STRING,
      location: DataTypes.STRING,

      remember_info: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },


    {
      sequelize,
      modelName: 'Users',
      tableName: 'Users',
      timestamps: true,
    }

  );
  return User;
};
