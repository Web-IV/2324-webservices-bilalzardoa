// config/test.js
module.exports = {
    env:'development',
    log: {
      level: 'info',
      disabled: true,
    },
    cors: { // 👈 1
      origins: ['http://localhost:5173'], 
      maxAge: 3 * 60 * 60,
    },
    database: {
      client: 'mysql2',
      host: 'vichogent.be',
      port: 40043,
      name: '293826bz',
      username: '293826bz',
      password: 'b6lK857HD5ndOdN356Cw',
    },
    testEnvironment: 'node',

  };
  