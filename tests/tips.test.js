const request = require('supertest');
const app = require('../server');

beforeAll(async () => {
  const mongodb = require('../data/database');
  await new Promise((resolve, reject) => {
    mongodb.initDb((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
});

describe('Tips API', () => {

  test('GET /tips - should return all tips', async () => {
    const res = await request(app).get('/tips');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /tips/:id - valid ID', async () => {
    const tipId = "69de7d606cbbea147d608b1b";

    const res = await request(app).get(`/tips/${tipId}`);

    expect(res.statusCode).toBe(200);
  });

  test('GET /tips/:id - invalid ID', async () => {
    const res = await request(app).get('/tips/123');

    expect(res.statusCode).toBe(400);
  });

  test('GET /tips/:id - not found', async () => {
    const fakeId = "507f1f77bcf86cd799439011";

    const res = await request(app).get(`/tips/${fakeId}`);

    expect(res.statusCode).toBe(404);
  });

});