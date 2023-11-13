// config/production.js
module.exports = {
  env: process.env.NODE_ENV || 'production',
  log: {
    level: 'info',
    disabled: false,
  },
};
