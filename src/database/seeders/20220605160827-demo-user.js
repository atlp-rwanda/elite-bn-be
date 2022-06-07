'use strict';
import bcryptjs from 'bcryptjs';
const { hash } = bcryptjs;

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert(
        'Users',
        [
          {
            name: 'ana avi',
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
          name: 'ana avi',
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
          name: 'ana avi',
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
          name: 'ana avi',
          username: 'anavi14',
          email: 'test4@gmail.com',
          password: await hash('test4', 12),
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
