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

describe('Favorites API', () => {

  test('GET /favorites - should return all favorites', async () => {
    const res = await request(app).get('/favorites');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /favorites/:id - valid ID', async () => {
    const favId = "69de7d0a6cbbea147d608b12";

    const res = await request(app).get(`/favorites/${favId}`);

    expect(res.statusCode).toBe(200);
  });

  test('GET /favorites/:id - invalid ID', async () => {
    const res = await request(app).get('/favorites/123');

    expect(res.statusCode).toBe(400);
  });

  test('GET /favorites/:id - not found', async () => {
    const fakeId = "507f1f77bcf86cd799439011";

    const res = await request(app).get(`/favorites/${fakeId}`);

    expect(res.statusCode).toBe(404);
  });

});