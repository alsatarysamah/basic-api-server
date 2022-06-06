'use strict';
const { app } = require('../src/server'); // destructing assignment 
const supertest = require('supertest');
const mockRequest = supertest(app);
const { db } = require('../src/models/index');


beforeAll(async () => {
    await db.sync();
});

describe('Web server', () => {
    it('bad route', async () => {
        const response = await mockRequest.get('/bad');
        expect(response.status).toBe(404);
    });

    it('bad method', async () => {
        const response = await mockRequest.delete('/food');
        expect(response.status).toBe(404);
    });

    it('adding a food', async () => {
        const response = await mockRequest.post('/food').send({
            name:"sushi",
            description:"yemeee"
        });
        expect(response.status).toBe(201);
    });

    it('geting all food', async () => {
        const response = await mockRequest.get('/food');
        expect(response.status).toBe(200);

    });

    test('updating a record', async () => {
        const response = await mockRequest.put('/food/2');
        expect(response.status).toBe(201);
    });
    it('deleting a record', async () => {
        const response = await mockRequest.delete('/food/3');
        expect(response.status).toBe(204);
    });

})
