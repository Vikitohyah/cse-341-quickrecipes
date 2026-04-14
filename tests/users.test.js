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

describe('Users API', () => {

  test('GET /users - should return all users', async () => {
    const res = await request(app).get('/users');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /users/:id - valid ID', async () => {
    const userId = "69cd8730c7a3276b16e72e67";

    const res = await request(app).get(`/users/${userId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id');
  });

  test('GET /users/:id - invalid ID', async () => {
    const res = await request(app).get('/users/123');

    expect(res.statusCode).toBe(400);
  });

  test('GET /users/:id - not found', async () => {
    const fakeId = "507f1f77bcf86cd799439011";

    const res = await request(app).get(`/users/${fakeId}`);

    expect(res.statusCode).toBe(404);
  });

});