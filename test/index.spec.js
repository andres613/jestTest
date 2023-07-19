import app from "../src/app";
import request from 'supertest';

describe('GET /tasts', () => {
    test('should respond with a 200 status code', async () => {
        const response = await request(app).get('/tasks').send();
        expect(response.statusCode).toBe(200);
    })
  
    test('should respond with a array', async () => {
        const response = await request(app).get('/tasks').send();
        expect(response.body).toBeInstanceOf(Array);
    })

})

describe('POST /tasts', () => {

    describe('given a title and description', () => {
        const task = {
            title: 'test task',
            description: 'test description'
        }

        test('should respond with a 200 status code', async () => {
            const response = await request(app).get('/tasks').send();
            expect(response.statusCode).toBe(200);
        })

        test('should have a content-type: applicarion/json in header', async () => {
            const response = await request(app).get('/tasks').send();
            expect(response.headers["content-type"]).toEqual(
                expect.stringContaining("json")
            );
        })

        test('should respond with a task ID', async () => {
            const response = await request(app).post('/tasks').send(task);
            expect(response.body.id).toBeDefined();
        })
    })

    describe('when title and description is missing', () => {
        test('should respond with a 400 status code', async () => {
            const fields = [
                {},
                {title: 'Test task'},
                {description: 'Test description'}
            ]

            for(const body of fields) {
                const response = await request(app).post('/tasks').send(body);
                expect(response.statusCode).toBe(400);
            }
        })
    })
})
