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
    host: 'vichogent.be',
    port: 40043,
    name: '293826bz',
    username: '293826bz',
    password: 'b6lK857HD5ndOdN356Cw',
  },
auth: {
    argon: {
      saltLength: 16,
      hashLength: 32,
      timeCost: 6,
      memoryCost: 2 ** 17,
    },
    jwt: {
      secret: 'eenveeltemoeilijksecretdatniemandooitzalradenandersisdesitegehacked',
      expirationInterval: 60 * 60 * 1000, // ms (1 hour)
      issuer: 'nexus',
      audience: 'nexus',
    },
  },
};
