const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
describe('backend-express-template-routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  it('#GET /cats should return a list of cats', async () => {
    const res = await request(app).get('/cats');
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

  it('#GET /cats/:id should return single cat', async () => {
    const res = await request(app).get('/cats/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: expect.any(String),
      type: expect.any(String),
      age: expect.any(Number)
    }));
  });

  it('#POST /cats should add a new cat', async () => {
    const newCat = {
      name: 'Sally',
      type: 'Short Hair',
      age: 4
    };
    const res = await request(app).post('/cats').send(newCat);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newCat
    });
  });

  it('#PUT /cats/:id should update a cat', async () => {
    const res = await request(app).put('/cats/1').send({
      age: 1
    });
    expect(res.status).toBe(200);
    expect(res.body.age).toEqual(1);
  });

  it('#DELETE /cats/:id should remove a cat', async () => {
    const res = await request(app).delete('/cats/1');
    expect(res.status).toBe(200);

    const catRes = await request(app).get('/cats/1');
    expect(catRes.status).toBe(500);
  });
});
