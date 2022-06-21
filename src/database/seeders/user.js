'use strict';
import bcryptjs from 'bcryptjs';
const { hash } = bcryptjs;

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert(
        'Users',
        [
          {
            firstName: 'kiko',
            lastName: 'lulu',
            username: 'kikolulu12',
            email: 'kikolulu@gmail.com',
            password: await hash('kikolulu@123', 12),
            role: 'super admin',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            firstName: 'juli',
            lastName: 'ish',
            username: 'julishi14',
            email: 'kakamao@gmail.com',
            password: await hash('kakamao@1234', 12),
            role: 'requester',
            createdAt: new Date(),
            updatedAt: new Date()
          },
        ],
        {}
      );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
