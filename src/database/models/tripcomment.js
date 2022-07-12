'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tripComment extends Model {
    static associate(models) {
      tripComment.belongsTo(models.tripRequest, {
        foreignKey: {
          name: 'tripId',
        },
        as: 'travelRequest',
      });
      tripComment.belongsTo(models.Users, {
        foreignKey: {
          name: 'tripperId',
        },
        as: 'requester',
      });
    }
  }
  tripComment.init(
    {
      tripId: DataTypes.INTEGER,
      tripperId: DataTypes.INTEGER,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'tripComment',
    }
  );
  return tripComment;
};
