'use strict';
import bcryptjs from 'bcryptjs';
const { hash } = bcryptjs;

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert(
        'Users',
        [
          {
            firstName: 'eri',
            lastName: 'manu',
            username: 'anavi14',
            email: 'test1@gmail.com',
            password: await hash('test1', 12),
            phoneNumber: '+2345849945',
            gender: 'female',
            address: 'kk av 54',
            role: 'requester',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
          firstName: 'emma',
          lastName: 'benny',
          username: 'anavi14',
          email: 'test2@gmail.com',
          password: await hash('test2', 12),
          phoneNumber: '+2345849945',
          gender: 'female',
          address: 'kk av 54',
          role: 'requester',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'emma',
          lastName: 'benny',
          username: 'anavi14',
          email: 'test3@gmail.com',
          password: await hash('test3', 12),
          phoneNumber: '+2345849945',
          gender: 'female',
          address: 'kk av 54',
          role: 'requester',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'mary',
          lastName: 'jbri',
          username: 'mary1',
          email: 'usertestme@gmail.com',
          password: await hash('testme123', 12),
          phoneNumber: '+2345849945',
          gender: 'female',
          address: 'kk av 54',
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
