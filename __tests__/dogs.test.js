const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
describe('backend-express-template-routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  it('#GET /dogs should return a list of dogs', async () => {
    const res = await request(app).get('/dogs');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([
      {
        id: expect.any(String),
        name: expect.any(String),
        type: expect.any(String),
        age: expect.any(Number)
      }
    ]));
  });

  it('#GET /dogs/:id should return single dog', async () => {
    const res = await request(app).get('/dogs/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: expect.any(String),
      type: expect.any(String),
      age: expect.any(Number)
    }));
  });

});
