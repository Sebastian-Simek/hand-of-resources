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

  it('#GET /cars/:id should return a single car', async () => {
    const res = await request(app).get('/cars/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      {
        id: '1',
        name: 'Outback',
        manufacturer: 'Subaru',
        country: 'Japan',
        year: 2003
      }
    );
  });

  it('#POST /cars should add a new car', async () => {
    const newCar = {
      name: 'Golf',
      manufacturer: 'VW',
      country: 'Germany',
      year: 2018
    };

    const res = await  request(app).post('/cars').send(newCar);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newCar
    });
  });

  it('#PUT /cars/:id should update an existing car', async () => {
    const res = await request(app).put('/cars/1').send({
      name: 'STI',
      year: 2015
    });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('STI');
    expect(res.body.year).toBe(2015);
  });
  'asdfasdf'
  afterAll(() => {
    pool.end();
  });
});
