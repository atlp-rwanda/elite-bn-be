'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  hash
} = _bcryptjs.default;
var _default = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [{
    firstName: 'celineeeee',
    lastName: 'eliab',
    username: 'ishimwe',
    email: 'test1@gmail.com',
    password: await hash('test1', 12),
    role: 'requester',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    firstName: 'armel',
    lastName: 'munyaneza',
    username: 'lorex',
    email: 'test2@gmail.com',
    password: await hash('commentManager@1', 12),
    role: 'manager',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    firstName: 'mukantwari',
    lastName: 'M',
    username: 'rose',
    email: 'test3@gmail.com',
    password: await hash('test3', 12),
    role: 'requester',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    firstName: 'Placide',
    lastName: 'K',
    username: 'uwamahoro',
    email: 'test4@gmail.com',
    password: await hash('test4', 12),
    role: 'travel admin',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {})
};
exports.default = _default;