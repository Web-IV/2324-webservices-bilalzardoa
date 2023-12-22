const supertest = require('supertest');
const { withServer} = require('../supertest.setup');



describe('Health', () => {
  let request ;

  withServer(({
    supertest,
  }) => {
    request = supertest;
  });


  describe('GET /api/health/ping', () => {
    it('should return pong', async () => {
      const response = await request.get('/api/health/ping');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ pong: true });
    });
  });
});
