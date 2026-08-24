import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';

describe('Suite de Tests Funcionales — ShipNow API', () => {

  describe('GET /api/mocks/users', () => {
    it('Debe devolver la cantidad de usuarios mock solicitada', async () => {
      const res = await request(app).get('/api/mocks/users?qty=3');
      expect(res.status).to.equal(200);
      expect(res.body.payload).to.be.an('array').that.has.lengthOf(3);
    });
  });

  describe('GET /api/logger-test', () => {
    it('Debe ejecutar y emitir todos los niveles de log', async () => {
      const res = await request(app).get('/api/logger-test');
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal('success');
    });
  });

  describe('GET /api/docs/', () => {
    it('Debe responder con la interfaz de Swagger UI (200 OK)', async () => {
      const res = await request(app).get('/api/docs/');
      expect(res.status).to.equal(200);
    });
  });

});