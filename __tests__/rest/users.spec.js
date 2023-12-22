const {tables } = require('../../app/src/data');
const Role = require('../../app/src/core/roles');
const { withServer, login, loginAdmin } = require('../supertest.setup');
const { testAuthHeader } = require('../common/auth');



describe('Users', () => {
  let request, knex, authHeader ;

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
      username: 'admin3',
      email: 'admin3@hogent.be',
      password_hash:
        '$argon2id$v=19$m=2048,t=2,p=1$NF6PFLTgSYpDSex0iFeFQQ$Rz5ouoM9q3EH40hrq67BC3Ajsu/ohaHnkKBLunELLzU',
      roles: JSON.stringify([Role.ADMIN, Role.USER]),
    },
  ]


  beforeAll(async () => {
    //authHeader = await login(request, knex);
    //adminAuthHeader = await loginAdmin(request, knex);
  });
  beforeEach(async () => {
    // Clear the users table
    
    await knex('activity').delete();

    await knex('users').delete();
  });

  it('should get all users', async () => {
    await knex(tables.users).insert(data);

    //token in string format 
    const token = await login(request, knex);
    authHeader = `Bearer ${token}`;

    const url = '/api/user/users';
  
    // Test getting all users
    const response = await request.get(url).set('Authorization',authHeader);
  
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

 
  it('should get user by ID', async () => {

    await knex(tables.users).insert(data);

    const token = await login(request, knex);
    authHeader = `Bearer ${token}`;

    const userId = 1;
    const response = await request.get(`/api/user/${userId}`).set('Authorization',authHeader);    ;
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(userId);
  });

  it('should get user count', async () => {

    await knex(tables.users).insert(data);

    const response = await request.get('/api/user/count');
    expect(response.status).toBe(200);
  });

  it('should get user by email', async () => {

    await knex(tables.users).insert(data);

    const token = await login(request, knex);
    authHeader = `Bearer ${token}`;

    const userEmail = 'test.user@hogent.be';
    const response = await request.get(`/api/user/email/${userEmail}`).set('Authorization',authHeader);    ;
    expect(response.status).toBe(200);
    expect(response.body.email).toBe(userEmail);
  });

  it('should get user by username', async () => {

    await knex(tables.users).insert(data);

    const token = await login(request, knex);
    authHeader = `Bearer ${token}`;
    
    const username = 'Test User';
    const response = await request.get(`/api/user/username/${username}`).set('Authorization',authHeader);    ;
    expect(response.status).toBe(200);
    expect(response.body.username).toBe(username);
  });

})