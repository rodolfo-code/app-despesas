const knex = require('../database');

module.exports = {
  async find(filter) {
    return knex('users')
      .where(filter)
      .select('id', 'password', 'email', 'name', 'role');
  },

  async save(newUser) {
    return knex('users').insert(newUser, ['id', 'name', 'email', 'role']);
  },
};
