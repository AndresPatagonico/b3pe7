import './setup.js';
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../src/app.js';
import path from 'path';
import fs from 'fs';

const requester = supertest(app);

describe('Suite de Tests Funcionales - Carga de Archivos (Multer)', () => {
    const dummyFilePath = path.join(process.cwd(), 'tests', 'test-file.pdf');

    before(() => {
        fs.writeFileSync(dummyFilePath, '%PDF-1.4 Contenido dummy para tests');
    });

    after(() => {
        if (fs.existsSync(dummyFilePath)) {
            fs.unlinkSync(dummyFilePath);
        }
    });

    it('POST /api/users/:uid/documents - Debe responder 400 si falta el archivo', async () => {
        const fakeUserId = '60c72b2f9b1d8b2b8c8e4567';
        const response = await requester
            .post(`/api/users/${fakeUserId}/documents`)
            .field('docType', 'DNI');

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('status').that.equals('error');
        expect(response.body).to.have.property('error').that.equals('MISSING_FILE');
    });

    it('POST /api/users/:uid/documents - Debe responder 400 si el docType es inválido', async () => {
        const fakeUserId = '60c72b2f9b1d8b2b8c8e4567';
        const response = await requester
            .post(`/api/users/${fakeUserId}/documents`)
            .field('docType', 'TIPO_INVALIDO')
            .attach('document', dummyFilePath);

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('status').that.equals('error');
        expect(response.body).to.have.property('error').that.equals('INVALID_DOC_TYPE');
    });

    it('POST /api/users/:uid/documents - Debe responder 404 si el usuario no existe', async () => {
        const fakeUserId = '60c72b2f9b1d8b2b8c8e9999';
        const response = await requester
            .post(`/api/users/${fakeUserId}/documents`)
            .field('docType', 'DNI')
            .attach('document', dummyFilePath);

        expect(response.status).to.equal(404);
        expect(response.body).to.have.property('status').that.equals('error');
        expect(response.body).to.have.property('error').that.equals('USER_NOT_FOUND');
    });
});