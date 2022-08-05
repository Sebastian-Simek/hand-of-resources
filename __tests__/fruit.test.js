const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
describe('backend-express-template-routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  it('#GET /fruits should return a list of fruits', async () => {
    const res = await request(app).get('/fruits');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([
      {
        id: expect.any(String),
        name: expect.any(String),
        type: expect.any(String),
        is_healthy: expect.any(Boolean)
      }
    ]));
  });

  it('#GET /fruits/:id should return one fruit', async () => {
    const res = await request(app).get('/fruits/1');
    // expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: expect.any(String),
      type: expect.any(String),
      is_healthy: expect.any(Boolean)
    }));
  });
  
    
});
