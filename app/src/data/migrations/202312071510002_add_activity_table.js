const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.activity, (table) => {
      table.increments('id').primary(); // Auto-incrementing primary key
      table.integer('userId').unsigned().notNullable(); // Ensure userId is unsigned
      table.foreign('userId').references('id').inTable(tables.users);
      table.date('date').notNullable();
      table.text('content').notNullable();
      table.timestamps(true, true); // Adds created_at and updated_at columns
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.activity);
  },
};
