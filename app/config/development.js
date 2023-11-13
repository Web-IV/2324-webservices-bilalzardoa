// config/development.js
module.exports = {
  env: process.env.NODE_ENV || 'development',
  log: {
    level: 'info',
    disabled: false,
  },
};
