const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /instruments should return a list of instruments', async () => {
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

  it('#GET /instruments/:id should return one instrument', async () => {
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

  it('#POST /instruments should add a new instrument', async () => {
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

  it('#PUT /instruments/:id should update an existing instrument ', async () => {
    const res = await request(app).put('/instruments/1').send({
      range: 'Piccolo'
    });
    expect(res.status).toBe(200);
    expect(res.body.range).toBe('Piccolo');
  });

  it('#DELETE /instruments/:id should delete an instrument', async () => {
    const res = await request(app).delete('/instruments/1');
    expect(res.status).toBe(200);
    
    const instrumentRes = await request(app).get('/instruments/1');
    expect(instrumentRes.status).toBe(500);
  });
  afterAll(() => {
    pool.end();
  });
});
