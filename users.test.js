const request = require('supertest');
const app = require('../server');
const mongodb = require('../db/connect');

describe('Users GET Endpoints', () => {
    beforeAll(() => {
        jest.spyOn(mongodb, 'getDb').mockReturnValue({
            db: () => ({
                collection: () => ({
                    find: () => ({ toArray: jest.fn().mockResolvedValue([{ name: 'John Doe' }]) }),
                    findOne: jest.fn().mockImplementation((query) => {
                        if (query._id.toString() === '650c1f1e1f1f1f1f1f1f1f1a') {
                            return Promise.resolve({ name: 'John Doe' });
                        }
                        return Promise.resolve(null);
                    })
                })
            })
        });
    });

    test('GET /users should return all users', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body[0]).toHaveProperty('name');
    });

    test('GET /users/:id should return a user if ID is found', async () => {
        const validId = '650c1f1e1f1f1f1f1f1f1f1a';
        const res = await request(app).get(`/users/${validId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toBe('John Doe');
    });

    test('GET /users/:id should return 404 if user is missing', async () => {
        const missingId = '650c1f1e1f1f1f1f1f1f1f1b';
        const res = await request(app).get(`/users/${missingId}`);
        expect(res.statusCode).toEqual(404);
    });

    test('GET /users/:id should return 400 for malformed ID', async () => {
        const badId = 'abc';
        const res = await request(app).get(`/users/${badId}`);
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toBe('Must use a valid user ID');
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });
});