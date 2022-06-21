/*eslint-disable*/
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
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
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
      role: {
        type: Sequelize.ENUM,
        values: ['super admin', 'travel admin', 'manager', 'accommodation supplier', 'requester'],
        defaultValue: 'requester'
      },
      gender: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      birthdate: {
        type: Sequelize.STRING
      },
      nationality: {
        type: Sequelize.STRING
      },
      preferredLanguage: {
        type: Sequelize.STRING
      },
      preferredCurrency: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      },
      lineManager: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
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

