'use strict';

import bcryptjs from 'bcryptjs';
const { hash } = bcryptjs;

export default {
    up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [ {
        firstName: 'celineeeee',
        lastName: 'eliab',
        username: 'ishimwe',
        email: 'test1@gmail.com',
        password: await hash('test1', 12),
        role: 'requester',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        firstName: 'kevinnnnnnnnnnnn',
        lastName: 'mahoro',
        username: 'lorex',
        email: 'test2@gmail.com',
        password: await hash('commentManager@1', 12),
        role: 'manager',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        firstName: 'mukantwari',
        lastName: 'M',
        username: 'rose',
        email: 'test3@gmail.com',
        password: await hash('test3', 12),
        role: 'requester',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        firstName: 'Placide',
        lastName: 'K',
        username: 'uwamahoro',
        email: 'test4@gmail.com',
        password: await hash('test4', 12),
        role: 'travel admin',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    ], {}),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {})
};