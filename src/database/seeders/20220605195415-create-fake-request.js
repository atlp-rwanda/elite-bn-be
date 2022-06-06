'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      await queryInterface.bulkInsert('requests', [{
        id:1,
        requestId: 'req001',
        departureDate: '2020-06-22 19:10:25-07',
        returnDate: '2020-06-25 19:10:25-07',
        travelingReason: 'gutereta',
        status:'Pending',
        type: 'returning',
        handledBy:'Admin',
        tripId:'tri001',
        createdAt:'2020-06-22 19:10:25-07',
        updatedAt:'2020-06-22 19:10:25-07'
      }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('requests', null, {});
  }
};
