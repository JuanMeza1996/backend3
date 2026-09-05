import 'dotenv/config';
import request from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';
import app from '../src/app.js';
import { UserModel } from '../src/models/user.model.js';
import { ProductModel } from '../src/models/product.model.js';

describe('Suite de Pruebas Funcionales - ShipNow API', () => {

  before(async () => {
    if (mongoose.connection.readyState === 0) {
      const testMongoUri = process.env.MONGO_URI_TEST || process.env.MONGO_URI;
      await mongoose.connect(testMongoUri);
    }
  });

  after(async () => {
    if (mongoose.connection.readyState !== 0) {
      await UserModel.deleteMany({ email: /@test\.com$/ });
      await ProductModel.deleteMany({ name: /Test/ });
      await mongoose.connection.close();
    }
  });

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
        email: `test_${Date.now()}@test.com`,
        role: 'user'
      };

      const response = await request(app)
        .post('/api/users')
        .send(mockUser);

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('status', 'success');
      expect(response.body.payload).to.have.property('email', mockUser.email);
    });

    it('POST /api/users [ERROR] - Debe fallar con 409 si el email ya existe (USER_001)', async () => {
      const duplicateUser = {
        name: 'Usuario Repetido',
        email: 'duplicado@test.com',
        role: 'user'
      };

      await request(app).post('/api/users').send(duplicateUser);

      const response = await request(app)
        .post('/api/users')
        .send(duplicateUser);

      expect(response.status).to.equal(409);
      expect(response.body.status).to.be.oneOf(['fail', 'error']);
    });

    it('GET /api/users/:id [ERROR] - Debe fallar con 404 si el usuario no existe (USER_002)', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app).get(`/api/users/${fakeId}`);

      expect(response.status).to.equal(404);
      expect(response.body.status).to.be.oneOf(['fail', 'error']);
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
        name: 'Caja Test Reforzada',
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

    it('POST /api/products [ERROR] - Debe fallar con 400 si los datos son inválidos (PRODUCT_001)', async () => {
      const invalidProduct = { name: '', price: -500 };

      const response = await request(app)
        .post('/api/products')
        .send(invalidProduct);

      expect(response.status).to.equal(400);
      expect(response.body.status).to.be.oneOf(['fail', 'error']);
    });

    it('GET /api/products/:id [ERROR] - Debe fallar con 404 si el producto no existe (PRODUCT_002)', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app).get(`/api/products/${fakeId}`);

      expect(response.status).to.equal(404);
      expect(response.body.status).to.be.oneOf(['fail', 'error']);
    });
  });

  // ==========================================
  // 3. MÓDULO DE MOCKS (/api/mocks)
  // ==========================================
  describe('Módulo Mocks: /api/mocks', () => {
    it('GET /api/mocks/users - Debe retornar la cantidad solicitada mediante query param (200)', async () => {
      const response = await request(app).get('/api/mocks/users?qty=3');
      expect(response.status).to.equal(200);
      expect(response.body.payload).to.have.lengthOf(3);
    });

    it('GET /api/mocks/users [ERROR] - Debe fallar con 400 si la cantidad enviada es inválida (MOCK_001)', async () => {
      const response = await request(app).get('/api/mocks/users?qty=-5');
      expect(response.status).to.equal(400);
      expect(response.body.status).to.be.oneOf(['fail', 'error']);
    });
  });

  // ==========================================
  // 4. MÓDULO DE UPLOADS (/api/uploads)
  // ==========================================
  describe('Módulo Uploads: /api/uploads/document', () => {
    it('POST /api/uploads/document - Debe subir un archivo PDF válido (201)', async () => {
      const response = await request(app)
        .post('/api/uploads/document')
        .attach('document', Buffer.from('%PDF-1.4 test file content'), 'test_document.pdf');

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('status', 'success');
      expect(response.body.payload).to.have.property('originalname', 'test_document.pdf');
    });

    it('POST /api/uploads/document [ERROR] - Debe fallar con 400 si no se envía archivo', async () => {
      const response = await request(app).post('/api/uploads/document');
      expect(response.status).to.equal(400);
      expect(response.body.status).to.be.oneOf(['fail', 'error']);
    });
  });

});