
const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.users, (table) => {
      table.increments('id').primary(); // Auto-incrementing primary key
      table.string('username').notNullable();
      table.string('email').notNullable();
      table.string('password').notNullable();
    });
  },
  down: async (knex) => {
    await knex.schema.dropTableIfExists(tables.users);
  },
};
