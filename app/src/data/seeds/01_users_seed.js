// src/data/seeds/01_users_seed.js

const { tables } = require('../index');

  module.exports = {
    seed: async (knex)=>{

      // Check if there are any existing entries in the Users table
      const usersExist = await knex('users').count('* as count').first();

      // If there are existing entries, skip seeding
      if (usersExist.count > 0) {
        console.log('Users table already seeded. Skipping...');
        return;
      }  
        await knex(tables.users).insert([
            { username: 'John Doe', email: 'john@example.com', password: 'hashed_password1' },
            { username: 'Maria Gonzalez', email: 'maria@example.com', password: 'hashed_password2' },
            { username: 'Yuki Tanaka', email: 'yuki@example.com', password: 'hashed_password3' },
            { username: 'Ahmed Khan', email: 'ahmed@example.com', password: 'hashed_password4' },
          ]);
    }
  }