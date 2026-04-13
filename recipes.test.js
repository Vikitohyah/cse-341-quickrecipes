const request = require('supertest');
const app = require('../server');
const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

describe('Recipes GET Endpoints', () => {
    beforeAll(() => {
        // Mock the database connection
        jest.spyOn(mongodb, 'getDb').mockReturnValue({
            db: () => ({
                collection: () => ({
                    find: () => ({ toArray: jest.fn().mockResolvedValue([{ name: 'Test Pasta' }]) }),
                    findOne: jest.fn().mockImplementation((query) => {
                        if (query._id.toString() === '650c1f1e1f1f1f1f1f1f1f1f') {
                            return Promise.resolve({ name: 'Test Pasta' });
                        }
                        return Promise.resolve(null);
                    })
                })
            })
        });
    });

    test('GET /recipes should return all recipes', async () => {
        const res = await request(app).get('/recipes');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('GET /recipes/:id should return a single recipe if ID is valid', async () => {
        const validId = '650c1f1e1f1f1f1f1f1f1f1f';
        const res = await request(app).get(`/recipes/${validId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name');
    });

    test('GET /recipes/:id should return 404 if recipe does not exist', async () => {
        const nonExistentId = '650c1f1e1f1f1f1f1f1f1f1e';
        const res = await request(app).get(`/recipes/${nonExistentId}`);
        expect(res.statusCode).toEqual(404);
    });

    test('GET /recipes/:id should return 400 if ID format is invalid', async () => {
        const invalidId = '12345';
        const res = await request(app).get(`/recipes/${invalidId}`);
        expect(res.statusCode).toEqual(400);
    });

    afterAll(async () => {
        jest.restoreAllMocks();
    });
});