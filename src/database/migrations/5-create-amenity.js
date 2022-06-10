'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Amenities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      accommodationId: {
        type: Sequelize.INTEGER,
      },
      wifi: {
        type: Sequelize.BOOLEAN,
      },
      televison: {
        type: Sequelize.BOOLEAN,
      },
      smokeDetector: {
        type: Sequelize.BOOLEAN,
      },
      ironing: {
        type: Sequelize.BOOLEAN,
      },
      fireExtenguisher: {
        type: Sequelize.BOOLEAN,
      },
      airConditional: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Amenities');
  },
};
