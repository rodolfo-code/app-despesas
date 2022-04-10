const request = require('supertest');
const chance = require('chance').Chance();

const authServices = require('../../../src/services/authService');

const app = require('../../../src/app');
const knex = require('../../../src/database');

const MAIN_ROUTE = '/auth/signup';

describe('Testes de criação de novo usuário', () => {
  beforeAll(() => {
    return knex.raw('TRUNCATE TABLE users CASCADE');
  });

  beforeAll(async () => {
    return await authServices.save({
      name: 'Vincent Vega',
      email: 'vincent@gmail.com',
      password: '123456',
    });

    // user = { ...res[0] };
    // user.token = jwt.sign(user, secret);
  });

  test('Deve criar novo usuário via signup', async () => {
    // const email = chance.email({ domain: '@gmail.com' });

    return request(app)
      .post(MAIN_ROUTE)
      .send({
        name: 'Jules winnfield',
        email: 'jules@gmail.com',
        password: '123456',
      })
      .then((res) => {
        expect(res.status).toBe(201);
        expect(res.body).not.toHaveProperty('password');
        expect(res.body).toEqual(
          expect.objectContaining({
            name: 'Jules winnfield',
            email: 'jules@gmail.com',
          }),
        );
      });
  });

  test('Não deve criar usuario com email já existente', () => {
    return knex('users')
      .insert({
        name: 'Marcellus Wallace',
        email: 'marcellus@gmail.com',
        password: '123456',
      })
      .then(() =>
        request(app)
          .post(MAIN_ROUTE)
          .send({
            name: 'Marcellus Wallace',
            email: 'marcellus@gmail.com',
            password: '123456',
          })
          .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body.error).toBe('Email já cadastrado');
          }),
      );
  });

  test('Não deve criar usuário sem nome', () => {
    return request(app)
      .post(MAIN_ROUTE)
      .send({
        email: chance.email(),
        password: '123456',
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Campo nome é obrigatório');
      });
  });

  test('Não deve criar usuário sem email', async () => {
    return request(app)
      .post(MAIN_ROUTE)
      .send({
        name: 'Mia Wallace',
        password: '123456',
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('O campo "email" é obrigatório');
      });
  });

  test('Não deve criar usuário com email com formato inválido', async () => {
    return request(app)
      .post(MAIN_ROUTE)
      .send({
        name: 'Mia Wallace',
        email: 'miagmail.com',
        password: '123456',
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe(
          'O campo "email" deve conter um email válido',
        );
      });
  });

  test('Não deve criar usuário sem senha', () => {
    return request(app)
      .post(MAIN_ROUTE)
      .send({
        name: 'Mia Wallace',
        email: 'mia@gmail.com',
        password: '',
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('O campo "password" é obrigatório');
      });
  });

  test('Não deve criar usuário com senha menor que 6 caracteres', () => {
    return request(app)
      .post(MAIN_ROUTE)
      .send({
        name: 'Mia Wallace',
        email: 'mia@gmail.com',
        password: '12345',
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe(
          'O campo "password" deve ter no mínimo 6 caracteres',
        );
      });
  });
});
