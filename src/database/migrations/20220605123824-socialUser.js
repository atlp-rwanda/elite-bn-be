module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('Users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn('Users', 'googleId', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('Users', 'facebookId', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('Users', 'isVerified', {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('Users');
     */
    return Promise.all([
      queryInterface.removeColumn('Users', 'googleId'),
      queryInterface.removeColumn('Users', 'facebookId'),
      queryInterface.removeColumn('Users', 'isVerified'),
    ]);
  }
};
