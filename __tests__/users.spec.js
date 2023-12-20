const { getKnex, tables } = require('../app/src/data');
const supertest = require('supertest');
const Role = require('../app/src/core/roles');
const { withServer, login, loginAdmin } = require('./supertest.setup');
const { testAuthHeader } = require('./common/auth');



describe('Users', () => {

  let request, knex, authHeader, adminAuthHeader;

  withServer(({
    supertest,
    knex: k,
  }) => {
    request = supertest;
    knex = k;
  });

  const data = [
    {
      id:1,
      username: 'Test User',
      email: 'test.user@hogent.be',
      password_hash:
        '$argon2id$v=19$m=2048,t=2,p=1$NF6PFLTgSYpDSex0iFeFQQ$Rz5ouoM9q3EH40hrq67BC3Ajsu/ohaHnkKBLunELLzU',
      roles: JSON.stringify([Role.USER]),
    },
    {
      id:2,
      username: 'Admin User',
      email: 'admin.user@hogent.be',
      password_hash:
        '$argon2id$v=19$m=2048,t=2,p=1$NF6PFLTgSYpDSex0iFeFQQ$Rz5ouoM9q3EH40hrq67BC3Ajsu/ohaHnkKBLunELLzU',
      roles: JSON.stringify([Role.ADMIN, Role.USER]),
    },
  ]

  beforeAll(async () => {
    // Insert test data into the 'users' table before tests start
  })

  beforeEach(async () => {
    // Clear the users table
    await knex('users').delete();
  });



  it('should get all users', async () => {

    await knex(tables.users).insert(data);

    const response = await request.get('/api/user/users');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    // Add more expectations based on your user data and response structure
  });
  
  it('should get user by ID', async () => {
    await knex(tables.users).insert(data[0])
    const userId = 1;
    const response = await request.get(`/api/user/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(userId);
  });

  it('should get user count', async () => {
    await knex(tables.users).insert(data)
    const response = await request.get('/api/user/count');
    expect(response.status).toBe(200);
  });

  it('should get user by email', async () => {
    await knex(tables.users).insert(data)
    const userEmail = 'test.user@hogent.be';
    const response = await request.get(`/api/user/email/${userEmail}`);
    expect(response.status).toBe(200);
    expect(response.body.email).toBe(userEmail);
  });

  it('should get user by username', async () => {
    await knex(tables.users).insert(data)
    const username = 'Test User';
    const response = await request.get(`/api/user/username/${username}`);
    expect(response.status).toBe(200);
    expect(response.body.username).toBe(username);
  });

  // Add more test cases for other endpoints (register, login, delete, etc.)
});
