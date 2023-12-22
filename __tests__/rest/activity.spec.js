const {tables } = require('../../app/src/data');
const Role = require('../../app/src/core/roles');

const { withServer, login} = require('../supertest.setup');
const { testAuthHeader } = require('../common/auth');



describe('activities', () => {
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
  });

  beforeAll(async () => {

    await knex(tables.users).insert({
      id:49,
      username: 'Test User',
      email: 'test.userrr@hogent.be',
      password_hash:
        '$argon2id$v=19$m=2048,t=2,p=1$NF6PFLTgSYpDSex0iFeFQQ$Rz5ouoM9q3EH40hrq67BC3Ajsu/ohaHnkKBLunELLzU',
      roles: JSON.stringify([Role.USER]),
    },)
  })

  

  it('should add an activity entry', async () => {

    const token = await login(request, knex);
    authHeader = `Bearer ${token}`;

    const response = await request
      .post('/api/activity/add')
      .set('Authorization', authHeader)
      .send({
        userId: 49,
        date: '2023-01-01',
        content: 'This is a sample activity entry.',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('activityId');
  });


  it('should update an activity entry', async () => {

    const token = await login(request, knex);
    authHeader = `Bearer ${token}`;
    // Add a journal entry first
    const addResponse = await request
      .post('/api/activity/add')
      .set('Authorization', authHeader)
      .send({
        userId: 49,
        date: '2023-01-01',
        content: 'This is a sample activity entry.',
      });

    const activityId = addResponse.body.activityId;

    // Update the journal entry
    const updateResponse = await request
      .put(`/api/activity/${activityId}`)
      .set('Authorization', authHeader)
      .send({
        newContent: 'Updated content for the activity entry.',
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toHaveProperty('success', true);
  });

  it('should get all activities for a specific user', async () => {

    const token = await login(request, knex);
    authHeader = `Bearer ${token}`;
    // Add journal entries for a user
    await request
      .post('/api/activity/add')
      .set('Authorization', authHeader)
      .send({
        userId: 49,
        date: '2023-01-01',
        content: 'This is a sample activity entry.',
      });

    await request
      .post('/api/activity/add')
      .set('Authorization', authHeader)
      .send({
        userId: 49,
        date: '2023-01-02',
        content: 'Another sample activity entry.',
      });

    const response = await request
      .get('/api/activity/user/49')
      .set('Authorization', authHeader);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  it('should get an activityEntry by its ID', async () => {

    const token = await login(request, knex);
    authHeader = `Bearer ${token}`;
    // Add a journal entry first
    const addResponse = await request
      .post('/api/activity/add')
      .set('Authorization', authHeader)
      .send({
        userId: 49,
        date: '2023-01-01',
        content: 'This is a sample activity entry.',
      });

    const activityId = addResponse.body.activityId;

    // Get the journal entry by ID
    const getResponse = await request
      .get(`/api/activity/${activityId}`)
      .set('Authorization', authHeader);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toHaveProperty('userId', 49);
  });

  it('should delete an activity entry by its ID', async () => {

    const token = await login(request, knex);
    authHeader = `Bearer ${token}`;
    // Add a journal entry first
    const addResponse = await request
      .post('/api/activity/add')
      .set('Authorization', authHeader)
      .send({
        userId: 49,
        date: '2023-01-01',
        content: 'This is a sample activity entry.',
      });

    const activityId = addResponse.body.activityId;

    // Delete the journal entry by ID
    const deleteResponse = await request
      .delete(`/api/activity/${activityId}`)
      .set('Authorization', authHeader);

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toHaveProperty('success', true);
  });


  /////
  it('should fail to add an activity entry with invalid or missing fields', async () => {
    const token = await login(request, knex);
    authHeader = `Bearer ${token}`;
  
    const response = await request
      .post('/api/activity/add')
      .set('Authorization', authHeader)
      .send({
        // Missing required fields, or invalid data
      });
  
    expect(response.status).toBe(400); 
  });
  
  it('should fail to update an activity entry with invalid or missing fields', async () => {
    const token = await login(request, knex);
    authHeader = `Bearer ${token}`;
  
    const response = await request
      .put('/api/activity/1') 
      .set('Authorization', authHeader)
      .send({
        // Missing required fields, or invalid data
      });
  
    expect(response.status).toBe(400); 
  });
  
  it('should fail to update an activity entry with an invalid activity ID', async () => {
    const token = await login(request, knex);
    authHeader = `Bearer ${token}`;
  
    const response = await request
      .put('/api/activity/invalidId')
      .set('Authorization', authHeader)
      .send({
        newContent: 'Updated content for the activity entry.',
      });
  
    expect(response.status).toBe(400); 
  });
  
  it('should fail to delete an activity entry with an invalid activity ID', async () => {
    const token = await login(request, knex);
    authHeader = `Bearer ${token}`;
  
    const response = await request
      .delete('/api/activity/invalidId')
      .set('Authorization', authHeader);
  
    expect(response.status).toBe(400); 
  });
    
});
