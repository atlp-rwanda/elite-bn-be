'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tripRequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tripperId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      from: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      to: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Locations',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      departDate: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      returnDate: {
        type: Sequelize.STRING,
      },
      tripReasons: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      tripType: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      tripStatus: {
        allowNull: false,
        type: Sequelize.ENUM('pending', 'approved', 'denied'),
        defaultValue: 'pending',
      },
      accommodationId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Accomodations',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
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
    await queryInterface.dropTable('tripRequests');
  },
};
