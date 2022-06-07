'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      birthdate: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      preferredLanguage: {
        type: Sequelize.STRING
      },
      preferredCurrency: {
        type: Sequelize.STRING
      },
      lineManager: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.ENUM,
        values: [ 'super user', 'super admin', 'travel admin', 'travel team member',
          'manager', 'requester', 'accommodation supplier' ]
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};