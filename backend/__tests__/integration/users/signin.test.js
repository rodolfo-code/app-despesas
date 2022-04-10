const request = require('supertest');

const app = require('../../../src/app');
const authServices = require('../../../src/services/userService');
const knex = require('../../../src/database');

const MAIN_ROUTE = '/auth/signin';

describe('Authentication', () => {
  beforeEach(() => {
    return knex.raw('TRUNCATE TABLE users CASCADE');
  });

  test('should authenticate with valid credentials', async () => {
    return authServices
      .save({
        name: 'Winston Wolfe',
        email: 'winston@gmail.com',
        password: '123456',
      })
      .then(() =>
        request(app).post(MAIN_ROUTE).send({
          email: 'winston@gmail.com',
          password: '123456',
        }),
      )
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Winston Wolfe');
        expect(res.body.email).toBe('winston@gmail.com');
      });
  });

  test('should return jwt token when authenticated', async () => {
    return authServices
      .save({
        name: 'Winston Wolfe',
        email: 'winston@gmail.com',
        password: '123456',
      })
      .then(() =>
        request(app).post(MAIN_ROUTE).send({
          email: 'winston@gmail.com',
          password: '123456',
        }),
      )
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body).toEqual(
          expect.objectContaining({
            name: expect.any(String),
            email: expect.any(String),
            role: expect.any(String),
            token: expect.any(String),
          }),
        );
      });
  });

  test('should not authenticate with incorrect password', () => {
    return authServices
      .save({
        name: 'Winston Wolfe',
        email: 'winston@gmail.com',
        password: '123456',
      })
      .then(() =>
        request(app).post(MAIN_ROUTE).send({
          email: 'winston@gmail.com',
          password: '654321',
        }),
      )
      .then((res) => {
        expect(res.status).toBe(401);
        expect(res.body.error).toBe('Usuário ou senha incorreto');
      });
  });

  test('should not authenticate with incorrect email', () => {
    return authServices
      .save({
        name: 'Winston Wolfe',
        email: 'winston@gmail.com',
        password: '123456',
      })
      .then(() =>
        request(app).post(MAIN_ROUTE).send({
          email: 'incorrect@gmail.com',
          password: '123456',
        }),
      )
      .then((res) => {
        expect(res.status).toBe(401);
        expect(res.body.error).toBe('Usuário ou senha incorreto');
      });
  });
});
