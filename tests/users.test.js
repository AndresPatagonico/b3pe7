import './setup.js';
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../src/app.js';

const requester = supertest(app);

describe('Suite de Tests Funcionales - Módulo de Usuarios', () => {

    it('GET /api/users - Debe responder con status 200 y devolver un arreglo de usuarios', async () => {
        const response = await requester.get('/api/users');

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('status').that.equals('success');
        expect(response.body).to.have.property('payload');
        expect(response.body.payload).to.be.an('array');
    });

    it('GET /api/users/inexistent_route_test - Debe responder con status 404 ante una ruta inexistente', async () => {
        const response = await requester.get('/api/users/inexistent_route_test');

        expect(response.status).to.equal(404);
        expect(response.body).to.be.an('object');
    });

});