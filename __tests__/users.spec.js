const supertest = require('supertest');
const createServer = require('../app/src/createServer');
const { getKnex, tables } = require('../app/src/data');

describe('User API', () => {
  let server;
  let request;
  let knex;

  beforeAll(async () => {
    server = await createServer();
    request = supertest(server.getApp().callback());
    knex = getKnex();
  });

  afterAll(async () => {
    await server.stop();
  });

  beforeEach(async () => {
    // Clear the dependent table (journal) before each test
    await knex('journal').delete();

    // Clear the users table
    await knex('users').delete();
  });

  it('should get all users', async () => {
    await knex(tables.users).insert([
      { id:1 , username: 'User1', email: 'user1@example.com', password: 'password1' },
      { id: 2, username: 'User2', email: 'user2@example.com', password: 'password2' },
    ]);

    const response = await request.get('/api/nexus/allUsers');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    // Add more expectations based on your user data and response structure
  });

  it('should get a user by ID', async () => {
    const userId = 1;
      await knex(tables.users).insert({id: userId, username: 'User1', email: 'user1@example.com', password: 'password1' });

    const response = await request.get(`/api/nexus/user/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(userId);
    // Add more expectations based on your user data and response structure
  });

  it('should add a new user', async () => {
    const newUser = {
      username: 'NewUser',
      email: 'newuser@example.com',
      password: 'newpassword',
    };
  
    const response = await request.post('/api/nexus/addUser').send(newUser);
  
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  
    // Add a delay to allow the database operation to complete
    
    // Check if the user was added to the database using the username
    const addedUser = await knex(tables.users).where('username', newUser.username).first();
    expect(addedUser).toBeDefined();
    expect(addedUser.username).toBe(newUser.username);
    // Add more expectations based on your user data and response structure
  });  
});
