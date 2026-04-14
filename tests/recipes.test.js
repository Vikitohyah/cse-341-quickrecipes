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

describe('Recipes API', () => {

  test('GET /recipes - should return all recipes', async () => {
    const res = await request(app).get('/recipes');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /recipes/:id - valid ID', async () => {
    const recipeId = "69cd8a91c7a3276b16e72e6e";

    const res = await request(app).get(`/recipes/${recipeId}`);

    expect(res.statusCode).toBe(200);
  });

  test('GET /recipes/:id - invalid ID', async () => {
    const res = await request(app).get('/recipes/123');

    expect(res.statusCode).toBe(400);
  });

  test('GET /recipes/:id - not found', async () => {
    const fakeId = "507f1f77bcf86cd799439011";

    const res = await request(app).get(`/recipes/${fakeId}`);

    expect(res.statusCode).toBe(404);
  });

});