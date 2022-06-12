'use strict';
import bcryptjs from 'bcryptjs';
const { hash } = bcryptjs;

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert(
        'userRoles',
        [
          {
            firstName: 'ana',
            lastName:  'avi',
            username: 'anavi14',
            email: 'test1@gmail.com',
            password: await hash('test1', 12),
            role: 'requester',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
          firstName: 'emma',
          lastName: 'benny',
          username: 'anavi14',
          email: 'test2@gmail.com',
          role: 'manager',
          password: await hash('test2', 12),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'kenny',
          lastName: 'boy',
          username: 'kenyb12',
          email: 'test3@gmail.com',
          role: 'super_admin',
          password: await hash('test3', 12),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'montan',
          lastName: 'garu',
          username: 'montanG',
          email: 'test3@gmail.com',
          password: await hash('test3', 12),
          role: 'requester',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'okay',
          lastName: 'coise',
          username: 'okcoise12',
          email: 'usertestme@gmail.com',
          password: await hash('testme123', 12),
          role: 'travel_admin',
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
