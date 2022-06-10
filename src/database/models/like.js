import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      models.Users.hasMany(Like, {
        onDelete: 'CASCADE',
        foreignKey: 'userId',
      });
      Like.belongsTo(models.Users, {
        foreignKey: {
          name: 'userId',
        },
        allowNull: false,
      });

      models.Accomodation.hasMany(Like, {
        onDelete: 'CASCADE',
        foreignKey: 'accomodationId',
      });
      Like.belongsTo(models.Accomodation, {
        foreignKey: 'accomodationId',
        allowNull: false,
      });
    }
  }
  Like.init(
    {
      accomodationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      likeStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'Like',
      tableName: 'likes',
    }
  );
  return Like;
};
