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
      {
        id: expect.any(String),
        name: expect.any(String),
        category: expect.any(String),
        range: expect.any(String),
      }
    ]));
  });
  it('#GET /:id should return one instrument', async () => {
    const res = await request(app).get('/instruments/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.objectContaining(
      {
        id: expect.any(String),
        name: expect.any(String),
        category: expect.any(String),
        range: expect.any(String),
      }
    ));
  });
  it('#POST /should add a new instrument', async () => {
    const newInstrument = {
      name: 'Bass',
      category: 'Strings',
      range: 'Bass'
    };
    const res = await request(app).post('/instruments').send(newInstrument);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newInstrument
    });
  });

  afterAll(() => {
    pool.end();
  });
});
