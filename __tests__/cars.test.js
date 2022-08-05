const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template-routes', () => {
  beforeEach(() => {
    return setup(pool);
  });


  it('#GET /cars should return a list of cars', async () => {
    const res = await request(app).get('/cars');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([
      {
        id: expect.any(String),
        name: expect.any(String),
        manufacturer: expect.any(String),
        country: expect.any(String),
        year: expect.any(Number)
      }
    ]));
  });
  afterAll(() => {
    pool.end();
  });
});
