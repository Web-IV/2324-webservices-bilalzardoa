// src/data/seeds/01_users_seed.js

const { tables } = require('../index');
const Role = require('../../core/roles'); // Adjust the path as needed

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
          {
            username: 'bilalz',
            email: 'bilalz@gmail.com',
            password_hash:
              '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
            roles: JSON.stringify([Role.ADMIN, Role.USER]),
          },
          {
            username: 'Pieter Van Der Helst',
            email: 'pieter.vanderhelst@hogent.be',
            roles: JSON.stringify([Role.USER]),
            password_hash:
              '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
          },
          {
            username: 'Karine Samyn',
            email: 'karine.samyn@hogent.be',
            roles: JSON.stringify([Role.USER]),
            password_hash:
              '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
          },
        ])
    }
  }