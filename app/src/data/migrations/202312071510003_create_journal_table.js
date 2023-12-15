
const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.journal, (table) => {
      table.increments('id').primary(); // Auto-incrementing primary key
      table.integer('userId').unsigned().notNullable(); // Ensure userId is unsigned
      table.foreign('userId').references('id').inTable(tables.users);
      table.date('Date').notNullable();
      table.text('Content').notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.journal);
  },
};