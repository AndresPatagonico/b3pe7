import './setup.js';
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../src/app.js';

const requester = supertest(app);

describe('Suite de Tests Funcionales - Módulo de Mocks', () => {

    it('POST /api/mocks/seed - Debe generar e insertar datos válidos (éxito 200/201)', async () => {
        const response = await requester.post('/api/mocks/seed?qty=2');

        expect(response.status).to.be.oneOf([200, 201]);
        expect(response.body).to.have.property('status').that.equals('success');
    });

    it('POST /api/mocks/seed - Debe fallar con 400 exacto si la cantidad es inválida', async () => {
        const response = await requester.post('/api/mocks/seed?qty=-5');

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('status').that.equals('error');
        expect(response.body).to.have.property('message');
    });

});