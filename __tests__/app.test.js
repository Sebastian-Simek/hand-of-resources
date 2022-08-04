const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET / should return a list of instruments', async () => {
    const res = await request(app).get('/instruments');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([
      expect.objectContaining(
        {
          id: expect.any(String),
          name: expect.any(String),
          category: expect.any(String),
          range: expect.any(String),
        }
      )
    ]));
  });
  afterAll(() => {
    pool.end();
  });
});
