const request = require('supertest');

const app = require('../../../src/app');
const authServices = require('../../../src/services/userService');
const knex = require('../../../src/database');

describe('User router', () => {
  test('Should create new user', () => {
    return authServices.save({
      name: 'Winston Wolfe',
      email: 'winston@gmail.com',
      password: '123456',
    });
  });
});
