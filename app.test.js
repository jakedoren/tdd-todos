const { it, expect } = require("@jest/globals");
const request = require("supertest");
const { describe } = require("yargs");
const app = require('./app')

describe('Todos API', () => {

    it('GET /todos --> array todos', () => {
        return request(app)
        .get('/todos')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                    completed: expect.any(Boolean)
                })
            ]))
        })
    })

    it('GET /todos/id --> specific todo by ID', () => {
        return request(app)
        .get('/todos')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    name: expect.any(String),
                    completed: expect.any(Boolean)
                })
            )
        })
    })

    it('GET /todos/id --> 404 if not found', () => {
        return request(app).get('/todos/999999').expect(404)
    })

    it('POST /todos --> create todo', () => {
        return request(app)
        .post('/todos')
        .send({
            name: 'feed dogs'
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then((response) => {
            expect(response.body).toEqual(expect.objectContaining({
                name: 'feed dogs',
                completed: false
            }))
        })
    })

    it('GET /todos -- validates request body', () => {

    })

})
