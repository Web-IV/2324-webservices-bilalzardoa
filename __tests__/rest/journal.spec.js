const {tables } = require('../../app/src/data');
const Role = require('../../app/src/core/roles');

const { withServer, login} = require('../supertest.setup');
const { testAuthHeader } = require('../common/auth');



describe('journals', () => {
  let request, knex, authHeader;

  withServer(({
    supertest,
    knex: k,
  }) => {
    request = supertest;
    knex = k;
  });


  beforeEach(async () => {
    // Clear the users table
    //await knex('activity').delete();

    await knex('activity').delete();
    await knex('journal').delete();
  });

  beforeAll(async () => {

      await knex('users').delete();
      await knex(tables.users).insert({
      id:1,
      username: 'Test User',
      email: 'test.user@hogent.be',
      password_hash:
        '$argon2id$v=19$m=2048,t=2,p=1$NF6PFLTgSYpDSex0iFeFQQ$Rz5ouoM9q3EH40hrq67BC3Ajsu/ohaHnkKBLunELLzU',
      roles: JSON.stringify([Role.USER]),
    },)
  })


  it('should add a journal entry', async () => {

    const token = await login(request, knex);
    authHeader = `Bearer ${token}`;

    const response = await request
      .post('/api/journal/add')
      .set('Authorization', authHeader)
      .send({
        userId: 1,
        date: '2023-01-01',
        content: 'This is a sample journal entry.',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('journalId');
  });

  it('should update a journal entry', async () => {

    const token = await login(request, knex);
    authHeader = `Bearer ${token}`;
    // Add a journal entry first
    const addResponse = await request
      .post('/api/journal/add')
      .set('Authorization', authHeader)
      .send({
        userId: 1,
        date: '2023-01-01',
        content: 'This is a sample journal entry.',
      });

    const journalId = addResponse.body.journalId;

    // Update the journal entry
    const updateResponse = await request
      .put(`/api/journal/${journalId}`)
      .set('Authorization', authHeader)
      .send({
        newContent: 'Updated content for the journal entry.',
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toHaveProperty('success', true);
  });

  it('should get all journals for a specific user', async () => {

    const token = await login(request, knex);
    authHeader = `Bearer ${token}`;
    // Add journal entries for a user
    await request
      .post('/api/journal/add')
      .set('Authorization', authHeader)
      .send({
        userId: 1,
        date: '2023-01-01',
        content: 'This is a sample journal entry.',
      });

    await request
      .post('/api/journal/add')
      .set('Authorization', authHeader)
      .send({
        userId: 1,
        date: '2023-01-02',
        content: 'Another sample journal entry.',
      });

    const response = await request
      .get('/api/journal/user/1')
      .set('Authorization', authHeader);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  it('should get a journal by its ID', async () => {

    const token = await login(request, knex);
    authHeader = `Bearer ${token}`;
    // Add a journal entry first
    const addResponse = await request
      .post('/api/journal/add')
      .set('Authorization', authHeader)
      .send({
        userId: 1,
        date: '2023-01-01',
        content: 'This is a sample journal entry.',
      });

    const journalId = addResponse.body.journalId;

    // Get the journal entry by ID
    const getResponse = await request
      .get(`/api/journal/${journalId}`)
      .set('Authorization', authHeader);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toHaveProperty('userId', 1);
  });

  it('should delete a journal entry by its ID', async () => {

    const token = await login(request, knex);
    authHeader = `Bearer ${token}`;
    // Add a journal entry first
    const addResponse = await request
      .post('/api/journal/add')
      .set('Authorization', authHeader)
      .send({
        userId: 1,
        date: '2023-01-01',
        content: 'This is a sample journal entry.',
      });

    const journalId = addResponse.body.journalId;

    // Delete the journal entry by ID
    const deleteResponse = await request
      .delete(`/api/journal/${journalId}`)
      .set('Authorization', authHeader);

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toHaveProperty('success', true);
  });
});
