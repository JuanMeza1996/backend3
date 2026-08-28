import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';

describe('Suite de Pruebas Funcionales - ShipNow API', () => {

  // ==========================================
  // 1. MÓDULO DE USUARIOS (/api/users)
  // ==========================================
  describe('Módulo Users: /api/users', () => {
    it('GET /api/users - Debe responder con 200 y una lista de usuarios', async () => {
      const response = await request(app).get('/api/users');
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('status', 'success');
      expect(response.body).to.have.property('payload').that.is.an('array');
    });

    it('POST /api/users - Debe crear un usuario exitosamente (201)', async () => {
      const mockUser = {
        name: 'Tester User',
        email: `test_${Date.now()}@example.com`,
        role: 'user'
      };

      const response = await request(app)
        .post('/api/users')
        .send(mockUser);

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('status', 'success');
      expect(response.body.payload).to.have.property('email', mockUser.email);
    });

    it('POST /api/users [ERROR] - Debe fallar con 409 si el email ya existe', async () => {
      const duplicateUser = {
        name: 'Usuario Repetido',
        email: 'duplicado@example.com',
        role: 'user'
      };

      // Primer registro
      await request(app).post('/api/users').send(duplicateUser);

      // Intento de registro duplicado
      const response = await request(app)
        .post('/api/users')
        .send(duplicateUser);

      expect(response.status).to.equal(409);
      expect(response.body).to.have.property('status', 'error');
      expect(response.body).to.have.property('errorCode', 'USER_001');
    });
  });

  // ==========================================
  // 2. MÓDULO DE PRODUCTOS (/api/products)
  // ==========================================
  describe('Módulo Products: /api/products', () => {
    it('GET /api/products - Debe responder con 200 y el catálogo de productos', async () => {
      const response = await request(app).get('/api/products');
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('status', 'success');
      expect(response.body).to.have.property('payload').that.is.an('array');
    });

    it('POST /api/products - Debe crear un producto válido (201)', async () => {
      const newProduct = {
        name: 'Caja de Envío Reforzada',
        price: 1500,
        stock: 20
      };

      const response = await request(app)
        .post('/api/products')
        .send(newProduct);

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('status', 'success');
      expect(response.body.payload).to.have.property('name', newProduct.name);
    });

    it('POST /api/products [ERROR] - Debe fallar con 400 si faltan datos o el precio es inválido', async () => {
      const invalidProduct = {
        name: '',
        price: -500
      };

      const response = await request(app)
        .post('/api/products')
        .send(invalidProduct);

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('status', 'error');
      expect(response.body).to.have.property('errorCode', 'PRODUCT_001');
    });
  });

  // ==========================================
  // 3. MÓDULO DE MOCKS & LOGGER
  // ==========================================
  describe('Módulos Auxiliares: /api/mocks & /api/logger-test', () => {
    it('GET /api/mocks/users - Debe retornar la cantidad solicitada mediante query param', async () => {
      const response = await request(app).get('/api/mocks/users?qty=3');
      expect(response.status).to.equal(200);
      expect(response.body.payload).to.have.lengthOf(3);
    });

    it('GET /api/logger-test - Debe emitir logs en todos los niveles y responder 200 OK', async () => {
      const response = await request(app).get('/api/logger-test');
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('status', 'success');
    });
  });

  // ==========================================
  // 4. CONTROL DE RUTAS INEXISTENTES (404)
  // ==========================================
  describe('Manejo Global de Rutas Desconocidas', () => {
    it('GET /api/ruta-inexistente - Debe retornar error 404', async () => {
      const response = await request(app).get('/api/ruta-inexistente');
      expect(response.status).to.equal(404);
    });
  });
  // ==========================================
  // 5. MÓDULO DE UPLOADS (/api/uploads)
  // ==========================================
  describe('Módulo Uploads: /api/uploads/document', () => {
    it('POST /api/uploads/document - Debe subir un archivo PDF válido y guardar metadatos (201)', async () => {
      const response = await request(app)
        .post('/api/uploads/document')
        .attach('document', Buffer.from('%PDF-1.4 test file content'), 'test_document.pdf');

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('status', 'success');
      expect(response.body.payload).to.have.property('originalname', 'test_document.pdf');
    });

    it('POST /api/uploads/document [ERROR] - Debe fallar con 400 si no se envía archivo', async () => {
      const response = await request(app)
        .post('/api/uploads/document');

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('status', 'error');
    });
  });

});
