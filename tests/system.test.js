import './setup.js';
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../src/app.js';

const requester = supertest(app);

describe('Suite de Tests Funcionales - Sistema (Logger y Swagger)', () => {

    it('GET /api/test-logger - Debe responder con status 200 y registrar logs', async () => {
        const response = await requester.get('/api/test-logger');

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('status').that.equals('success');
    });

    it('GET /api/docs/ - Debe poder acceder a la documentación de Swagger', async () => {
        const response = await requester.get('/api/docs/');

        expect(response.status).to.be.oneOf([200, 301, 302]);
    });

});