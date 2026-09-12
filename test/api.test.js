import 'dotenv/config';

import fs from 'node:fs/promises';

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

import {
  DriverModel
} from '../src/models/driver.model.js';

import {
  DeliveryModel
} from '../src/models/delivery.model.js';


describe(
  'ShipNow API - Functional Tests',
  function () {
    this.timeout(15000);

    let createdUser;
    let createdProduct;
    let createdOrder;
    let createdDriver;
    let createdDelivery;
    let uploadedDocumentPath;


    before(
      async () => {
        const uri =
          process.env.MONGO_URI_TEST ||
          'mongodb://localhost:27017/shipnow_test';

        await mongoose.connect(uri);

        await Promise.all([
          UserModel.deleteMany({
            email: /@shipnow-test\.local$/
          }),

          ProductModel.deleteMany({
            name: /^TEST-/
          }),

          OrderModel.deleteMany({
            customerName: /^TEST-/
          }),

          DriverModel.deleteMany({
            email: /@shipnow-test\.local$/
          }),

          DeliveryModel.deleteMany({}),

          DocumentModel.deleteMany({
            originalname: /^test-/
          })
        ]);
      }
    );


    after(
      async () => {
        /*
         * Elimina físicamente el archivo generado por Multer
         * para que npm test no deje basura en uploads/.
         */
        if (uploadedDocumentPath) {
          try {
            await fs.unlink(
              uploadedDocumentPath
            );
          } catch (error) {
            if (error.code !== 'ENOENT') {
              console.warn(
                `No se pudo eliminar el archivo de prueba: ${error.message}`
              );
            }
          }
        }

        await Promise.all([
          UserModel.deleteMany({
            email: /@shipnow-test\.local$/
          }),

          ProductModel.deleteMany({
            name: /^TEST-/
          }),

          OrderModel.deleteMany({
            customerName: /^TEST-/
          }),

          DriverModel.deleteMany({
            email: /@shipnow-test\.local$/
          }),

          DeliveryModel.deleteMany({}),

          DocumentModel.deleteMany({
            originalname: /^test-/
          })
        ]);

        await mongoose.connection.close();
      }
    );


    /*
     * =========================================
     * HEALTH CHECK
     * =========================================
     */

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

        expect(
          response.body
        ).to.have.property(
          'environment'
        );

        expect(
          response.body
        ).to.have.property(
          'timestamp'
        );
      }
    );


    /*
     * =========================================
     * SWAGGER
     * =========================================
     */

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


    /*
     * =========================================
     * USUARIOS
     * =========================================
     */

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
        ).to.equal(
          'success'
        );

        expect(
          response.body.payload
        ).to.have.property(
          '_id'
        );

        expect(
          response.body.payload.email
        ).to.equal(
          data.email
        );

        createdUser =
          response.body.payload;
      }
    );


    it(
      'GET /api/users devuelve usuarios paginados',
      async () => {
        const response =
          await request(app)
            .get(
              '/api/users?page=1&limit=10'
            );

        expect(
          response.status
        ).to.equal(200);

        expect(
          response.body.status
        ).to.equal(
          'success'
        );

        expect(
          response.body.payload
        ).to.have.property(
          'docs'
        );

        expect(
          response.body.payload.docs
        ).to.be.an('array');
      }
    );


    it(
      'GET /api/users/:id obtiene usuario',
      async () => {
        const response =
          await request(app)
            .get(
              `/api/users/${createdUser._id}`
            );

        expect(
          response.status
        ).to.equal(200);

        expect(
          response.body.payload.email
        ).to.equal(
          createdUser.email
        );
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
          response.body.status
        ).to.equal(
          'fail'
        );

        expect(
          response.body.errorCode
        ).to.equal(
          'USER_001'
        );

        expect(
          response.body
        ).to.have.property(
          'message'
        );
      }
    );


    /*
     * =========================================
     * PRODUCTOS
     * =========================================
     */

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

        expect(
          response.body.status
        ).to.equal(
          'success'
        );

        expect(
          response.body.payload
        ).to.have.property(
          '_id'
        );

        createdProduct =
          response.body.payload;
      }
    );


    it(
      'GET /api/products devuelve productos',
      async () => {
        const response =
          await request(app)
            .get(
              '/api/products?page=1&limit=20'
            );

        expect(
          response.status
        ).to.equal(200);

        expect(
          response.body.payload.docs
        ).to.be.an('array');
      }
    );


    it(
      'GET /api/products/:id obtiene producto',
      async () => {
        const response =
          await request(app)
            .get(
              `/api/products/${createdProduct._id}`
            );

        expect(
          response.status
        ).to.equal(200);

        expect(
          response.body.payload._id
        ).to.equal(
          createdProduct._id
        );
      }
    );


    /*
     * =========================================
     * ENVÍOS
     * =========================================
     */

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
          response.body.status
        ).to.equal(
          'success'
        );

        expect(
          response.body.payload
        ).to.have.property(
          'trackingCode'
        );

        expect(
          response.body.payload.status
        ).to.equal(
          'pendiente'
        );

        createdOrder =
          response.body.payload;
      }
    );


    it(
      'GET /api/orders devuelve envíos',
      async () => {
        const response =
          await request(app)
            .get(
              '/api/orders?page=1&limit=20'
            );

        expect(
          response.status
        ).to.equal(200);

        expect(
          response.body.payload.docs
        ).to.be.an('array');
      }
    );


    it(
      'GET /api/orders/:id obtiene envío',
      async () => {
        const response =
          await request(app)
            .get(
              `/api/orders/${createdOrder._id}`
            );

        expect(
          response.status
        ).to.equal(200);

        expect(
          response.body.payload._id
        ).to.equal(
          createdOrder._id
        );

        expect(
          response.body.payload.trackingCode
        ).to.equal(
          createdOrder.trackingCode
        );
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
          response.body.status
        ).to.equal(
          'fail'
        );

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

        expect(
          response.body.payload.status
        ).to.equal(
          'en_camino'
        );
      }
    );


    it(
      'GET tracking inexistente devuelve 404',
      async () => {
        const response =
          await request(app)
            .get(
              '/api/orders/tracking/SHP-INEXISTENTE'
            );

        expect(
          response.status
        ).to.equal(404);

        expect(
          response.body.errorCode
        ).to.equal(
          'ORDER_002'
        );
      }
    );


    /*
     * =========================================
     * ENTREGAS
     * =========================================
     */

    it(
      'POST /api/deliveries crea entrega',
      async () => {
        createdDriver =
          await DriverModel.create({
            name:
              'TEST Repartidor',

            email:
              `driver-${Date.now()}@shipnow-test.local`,

            phone:
              '2644000000',

            vehicle:
              'Moto',

            isAvailable:
              true
          });

        const response =
          await request(app)
            .post('/api/deliveries')
            .send({
              orderId:
                createdOrder._id,

              driverId:
                createdDriver._id.toString()
            });

        expect(
          response.status
        ).to.equal(201);

        expect(
          response.body.status
        ).to.equal(
          'success'
        );

        expect(
          response.body.payload.status
        ).to.equal(
          'asignado'
        );

        createdDelivery =
          response.body.payload;
      }
    );


    it(
      'GET /api/deliveries/:id obtiene entrega',
      async () => {
        const response =
          await request(app)
            .get(
              `/api/deliveries/${createdDelivery._id}`
            );

        expect(
          response.status
        ).to.equal(200);

        expect(
          response.body.payload._id
        ).to.equal(
          createdDelivery._id
        );
      }
    );


    it(
      'PUT /api/deliveries/:id actualiza entrega',
      async () => {
        const response =
          await request(app)
            .put(
              `/api/deliveries/${createdDelivery._id}`
            )
            .send({
              status:
                'completado'
            });

        expect(
          response.status
        ).to.equal(200);

        expect(
          response.body.payload.status
        ).to.equal(
          'completado'
        );

        expect(
          response.body.payload
        ).to.have.property(
          'deliveredAt'
        );
      }
    );


    it(
      'PUT /api/deliveries/:id rechaza estado inválido',
      async () => {
        const response =
          await request(app)
            .put(
              `/api/deliveries/${createdDelivery._id}`
            )
            .send({
              status:
                'estado_inventado'
            });

        expect(
          response.status
        ).to.equal(400);

        expect(
          response.body.errorCode
        ).to.equal(
          'DELIVERY_002'
        );
      }
    );


    /*
     * =========================================
     * MOCKS
     * =========================================
     */

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
      'GET mocks/orders devuelve envíos simulados',
      async () => {
        const response =
          await request(app)
            .get(
              '/api/mocks/orders?qty=4'
            );

        expect(
          response.status
        ).to.equal(200);

        expect(
          response.body.payload
        ).to.have.lengthOf(4);
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
      'GET mocks/users rechaza cantidad superior al máximo',
      async () => {
        const response =
          await request(app)
            .get(
              '/api/mocks/users?qty=101'
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


    /*
     * =========================================
     * MULTER / UPLOADS
     * =========================================
     */

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
      'POST upload rechaza tipo de archivo inválido',
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
                'archivo de texto no permitido'
              ),
              {
                filename:
                  'test-invalid.txt',

                contentType:
                  'text/plain'
              }
            );

        expect(
          response.status
        ).to.equal(400);

        expect(
          response.body.status
        ).to.equal(
          'fail'
        );

        expect(
          response.body.errorCode
        ).to.equal(
          'FILE_002'
        );
      }
    );


    it(
      'POST upload acepta PDF y guarda metadatos',
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
              {
                filename:
                  'test-upload.pdf',

                contentType:
                  'application/pdf'
              }
            );

        expect(
          response.status
        ).to.equal(201);

        expect(
          response.body.status
        ).to.equal(
          'success'
        );

        expect(
          response.body.payload
        ).to.have.property(
          'originalname',
          'test-upload.pdf'
        );

        expect(
          response.body.payload
        ).to.have.property(
          'mimetype',
          'application/pdf'
        );

        expect(
          response.body.payload.userId.toString()
        ).to.equal(
          createdUser._id.toString()
        );

        uploadedDocumentPath =
          response.body.payload.path;
      }
    );


    /*
     * =========================================
     * MANEJO GLOBAL DE ERRORES
     * =========================================
     */

    it(
      'GET recurso con ID inválido devuelve error estandarizado',
      async () => {
        const response =
          await request(app)
            .get(
              '/api/users/id-invalido'
            );

        expect(
          response.status
        ).to.equal(400);

        expect(
          response.body.status
        ).to.equal(
          'fail'
        );

        expect(
          response.body.errorCode
        ).to.equal(
          'SYS_002'
        );

        expect(
          response.body
        ).to.have.property(
          'message'
        );
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
          response.body.status
        ).to.equal(
          'fail'
        );

        expect(
          response.body.statusCode
        ).to.equal(404);

        expect(
          response.body.errorCode
        ).to.equal(
          'SYS_003'
        );

        expect(
          response.body
        ).to.have.property(
          'message'
        );
      }
    );
  }
);