// config/development.js
module.exports = {
  env:'development',
  log: {
    level: 'info',
    disabled: false,
  },
  cors: { // 👈 1
    origins: ['http://localhost:5173'], 
    maxAge: 3 * 60 * 60,
  },
  database: {
    client: 'mysql2',
    host: 'localhost',
    port: 3306,
    name: 'nexus',
    username: 'bilal',
    password: 'Nexus2024',
  },
};
