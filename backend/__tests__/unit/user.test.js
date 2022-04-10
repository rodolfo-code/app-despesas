const bcrypt = require('bcrypt');

const authServices = require('../../src/services/authService');
const knex = require('../../src/database');

describe('User', () => {
  beforeEach(() => {
    return knex.raw('TRUNCATE TABLE users CASCADE');
  });

  test('should encrypt user password', async () => {
    await authServices.save({
      name: 'Winston Wolfe',
      email: 'winston@gmail.com',
      password: '123456',
    });

    const [user] = await knex('users')
      .where({ email: 'winston@gmail.com' })
      .select();

    const hash = await bcrypt.compare('123456', user.password);

    expect(hash).toBe(true);
  });
});
