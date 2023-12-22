 const supertest = require('supertest'); // 👈 4
const createServer = require('../app/src/createServer'); // 👈 3
const { getKnex } = require('../app/src/data/index'); // 👈 4

const login = async (supertest) => {
  // 👇 7
  const response = await supertest.post('/api/user/login').send({
    username: 'Test User',
    password: '12345678',
  });

  if (response.statusCode !== 200) {
    console.error('Login failed. Response:', response.body); // Log the response body
    throw new Error(response.body.message || 'Unknown error occurred');
  }

  const token = response.body.token;

  return token;
};

const withServer = (setter) => {
  let server;
  let supertestInstance;

  beforeAll(async () => {
    server = await createServer();
    supertestInstance = supertest(server.getApp().callback());

    setter({
      knex: getKnex(),
      supertest: supertestInstance,
    });
  });

  afterAll(async () => {
    if (server) {
      await server.stop();
    }
  });
};

module.exports = {
  login,
  withServer,
}; // 👈 1 en 6
