'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Users.hasMany(Chat, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });

      Chat.belongsTo(models.Users, {
        foreignKey: 'userId',
      });
    }
  }
  Chat.init(
    {
      userId: {
        type: DataTypes.UUID,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      chatTab: {
        type: DataTypes.STRING,
        defaultValue: 'barefoot namad',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Chat',
    }
  );
  return Chat;
};
