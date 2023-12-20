
const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.users, (table) => {
      table.increments('id').primary(); // Auto-incrementing primary key
      table.string('username').notNullable();
      table.string('email').notNullable().unique(); // Define and add unique constraint
      table.jsonb('roles').notNullable();
      table.string('password_hash').notNullable();
    });
  },
  down: async (knex) => {
    await knex.schema.dropTableIfExists(tables.users);
  },
};
