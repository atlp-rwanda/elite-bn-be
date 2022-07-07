'use strict';
import bcryptjs from 'bcryptjs';
const { hash } = bcryptjs;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 'e2ebed47-fc43-4655-b01a-1af869b9400b',
          firstName: 'kiko',
          lastName: 'lulu',
          username: 'kikolulu12',
          email: 'kikolulu@gmail.com',
          password: await hash('kikolulu@123', 12),
          role: 'super admin',
          googleId: '',
          facebookId: '',
          isVerified: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '343d910d-94be-4b6d-bbfd-143ada752139',
          firstName: 'kaka',
          lastName: 'mao',
          username: 'kakamao12',
          email: 'kakamao@gmail.com',
          password: await hash('kakamao@1234', 12),
          role: 'travel admin',
          googleId: '',
          facebookId: '',
          isVerified: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '63ef729c-186d-4e16-9af3-520503b334ad',
          firstName: 'rick',
          lastName: 'rob',
          username: 'rickrob14',
          email: 'rickrob@gmail.com',
          password: await hash('rickrob@1234', 12),
          role: 'manager',
          googleId: '',
          facebookId: '',
          isVerified: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
