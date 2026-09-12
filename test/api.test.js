import 'dotenv/config';

import request from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';

import app from '../src/app.js';

import {
  UserModel
} from '../src/models/user.model.js';

import {
  ProductModel
} from '../src/models/product.model.js';

import {
  OrderModel
} from '../src/models/order.model.js';

import {
  DocumentModel
} from '../src/models/document.model.js';

describe(
  'ShipNow API - Functional Tests',
  function () {

    this.timeout(15000);

    let createdUser;
    let createdOrder;
    let uploadedDocumentPath;

    before(
      async () => {
        const uri =
          process.env.MONGO_URI_TEST ||
          'mongodb://localhost:27017/shipnow_test';

        await mongoose.connect(uri);

        await Promise.all([
          UserModel.deleteMany({
            email:
              /@shipnow-test\.local$/
          }),

          ProductModel.deleteMany({
            name: /^TEST-/
          }),

          OrderModel.deleteMany({
            customerName: /^TEST-/
          }),

          DocumentModel.deleteMany({
            originalname:
              /^test-/
          })
        ]);
      }
    );

    after(
      async () => {
        await UserModel.deleteMany({
          email:
            /@shipnow-test\.local$/
        });

        await ProductModel.deleteMany({
          name: /^TEST-/
        });

        await OrderModel.deleteMany({
          customerName: /^TEST-/
        });

        await DocumentModel.deleteMany({
          originalname:
            /^test-/
        });

        await mongoose
          .connection
          .close();
      }
    );

    it(
      'GET /health responde correctamente',
      async () => {
        const response =
          await request(app)
            .get('/health');

        expect([
          200,
          503
        ]).to.include(
          response.status
        );

        expect(
          response.body
        ).to.have.property(
          'status'
        );

        expect(
          response.body
        ).to.have.property(
          'database'
        );
      }
    );

    it(
      'GET /api/docs devuelve Swagger UI',
      async () => {
        const response =
          await request(app)
            .get('/api/docs/');

        expect(
          response.status
        ).to.equal(200);

        expect(
          response.text
        ).to.include(
          'Swagger UI'
        );
      }
    );

    it(
      'POST /api/users crea usuario',
      async () => {
        const data = {
          name:
            'TEST Usuario',

          email:
            `user-${Date.now()}@shipnow-test.local`,

          role:
            'user'
        };

        const response =
          await request(app)
            .post('/api/users')
            .send(data);

        expect(
          response.status
        ).to.equal(201);

        expect(
          response.body.status
        ).to.equal('success');

        createdUser =
          response.body.payload;
      }
    );

    it(
      'POST /api/users rechaza email duplicado',
      async () => {
        const data = {
          name:
            'TEST Duplicado',

          email:
            createdUser.email,

          role:
            'user'
        };

        const response =
          await request(app)
            .post('/api/users')
            .send(data);

        expect(
          response.status
        ).to.equal(409);

        expect(
          response.body.errorCode
        ).to.equal(
          'USER_001'
        );
      }
    );

    it(
      'POST /api/products crea producto',
      async () => {
        const response =
          await request(app)
            .post('/api/products')
            .send({
              name:
                `TEST-Producto-${Date.now()}`,

              price:
                1500,

              stock:
                10
            });

        expect(
          response.status
        ).to.equal(201);
      }
    );

    it(
      'POST /api/orders crea envío',
      async () => {
        const response =
          await request(app)
            .post('/api/orders')
            .send({
              userId:
                createdUser._id,

              customerName:
                'TEST Cliente',

              deliveryAddress:
                'Calle Test 123',

              totalAmount:
                2500,

              priority:
                'alta'
            });

        expect(
          response.status
        ).to.equal(201);

        expect(
          response.body.payload
        ).to.have.property(
          'trackingCode'
        );

        createdOrder =
          response.body.payload;
      }
    );

    it(
      'PUT /api/orders/:id actualiza estado',
      async () => {
        const response =
          await request(app)
            .put(
              `/api/orders/${createdOrder._id}`
            )
            .send({
              status:
                'en_camino'
            });

        expect(
          response.status
        ).to.equal(200);

        expect(
          response.body.payload.status
        ).to.equal(
          'en_camino'
        );
      }
    );

    it(
      'PUT /api/orders/:id rechaza estado inválido',
      async () => {
        const response =
          await request(app)
            .put(
              `/api/orders/${createdOrder._id}`
            )
            .send({
              status:
                'volando'
            });

        expect(
          response.status
        ).to.equal(400);

        expect(
          response.body.errorCode
        ).to.equal(
          'ORDER_003'
        );
      }
    );

    it(
      'GET tracking devuelve estado',
      async () => {
        const response =
          await request(app)
            .get(
              `/api/orders/tracking/${createdOrder.trackingCode}`
            );

        expect(
          response.status
        ).to.equal(200);

        expect(
          response.body.payload.trackingCode
        ).to.equal(
          createdOrder.trackingCode
        );
      }
    );

    it(
      'GET mocks/users devuelve cantidad solicitada',
      async () => {
        const response =
          await request(app)
            .get(
              '/api/mocks/users?qty=3'
            );

        expect(
          response.status
        ).to.equal(200);

        expect(
          response.body.payload
        ).to.have.lengthOf(3);
      }
    );

    it(
      'GET mocks/users rechaza cantidad inválida',
      async () => {
        const response =
          await request(app)
            .get(
              '/api/mocks/users?qty=-1'
            );

        expect(
          response.status
        ).to.equal(400);

        expect(
          response.body.errorCode
        ).to.equal(
          'MOCK_001'
        );
      }
    );

    it(
      'POST upload rechaza ausencia de archivo',
      async () => {
        const response =
          await request(app)
            .post(
              '/api/uploads/document'
            )
            .field(
              'userId',
              createdUser._id
            );

        expect(
          response.status
        ).to.equal(400);

        expect(
          response.body.errorCode
        ).to.equal(
          'FILE_001'
        );
      }
    );

    it(
      'POST upload acepta PDF',
      async () => {
        const response =
          await request(app)
            .post(
              '/api/uploads/document'
            )
            .field(
              'userId',
              createdUser._id
            )
            .attach(
              'document',
              Buffer.from(
                '%PDF-1.4 test'
              ),
              'test-upload.pdf'
            );

        expect(
          response.status
        ).to.equal(201);

        expect(
          response.body.payload
        ).to.have.property(
          'originalname',
          'test-upload.pdf'
        );

        uploadedDocumentPath =
          response.body.payload.path;
      }
    );

    it(
      'GET ruta inexistente devuelve 404 estandarizado',
      async () => {
        const response =
          await request(app)
            .get(
              '/ruta-inexistente'
            );

        expect(
          response.status
        ).to.equal(404);

        expect(
          response.body.errorCode
        ).to.equal(
          'SYS_003'
        );
      }
    );
  }
);