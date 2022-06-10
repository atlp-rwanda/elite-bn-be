const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class authorizedUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {}
  }
  authorizedUser.init(
    {
      refreshToken: { type: DataTypes.TEXT, allowNull: false },
      id: { type: DataTypes.STRING, unique: true, allowNull: false, primaryKey: true },
      //user_id: { type: DataTypes.STRING, unique: true, allowNull: false }
    },
    {
      sequelize,
      modelName: 'authorizedUser',
      tableName: 'authorizedUsers',
    }
  );
  return authorizedUser;
};
