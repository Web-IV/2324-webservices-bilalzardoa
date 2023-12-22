const config = require('config'); // 👈 2
const { initializeLogger } = require('../app/src/core/logging'); // 👈 2
const Role = require('../app/src/core/roles'); // 👈 4
const { initializeData, getKnex, tables } = require('../app/src/data'); // 👈 3 en 4

// 👇 1
module.exports = async () => {
  // Create a database connection
  // 👇 2
  initializeLogger({
    level: config.get('log.level'),
    disabled: config.get('log.disabled'),
  });
  await initializeData(); // 👈 3

  // Insert a test user with password 12345678
  const knex = getKnex(); // 👈 3

  // 👇 4


  await knex(tables.users).insert([
    {
      id: 20,
      username: 'amdin200',
      email: 'admin200@hogent.be',
      password_hash:
        '$argon2id$v=19$m=2048,t=2,p=1$NF6PFLTgSYpDSex0iFeFQQ$Rz5ouoM9q3EH40hrq67BC3Ajsu/ohaHnkKBLunELLzU',
      roles: JSON.stringify([Role.USER]),
    },
    {
      id: 25,
      username: 'Admin User',
      email: 'admin2100@hogent.be',
      password_hash:
        '$argon2id$v=19$m=2048,t=2,p=1$NF6PFLTgSYpDSex0iFeFQQ$Rz5ouoM9q3EH40hrq67BC3Ajsu/ohaHnkKBLunELLzU',
      roles: JSON.stringify([Role.ADMIN, Role.USER]),
    },
  ]);
};