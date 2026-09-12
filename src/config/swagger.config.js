import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',

    info: {
      title: 'ShipNow API',
      version: '2.0.0',
      description:
        'API backend profesional para gestión de usuarios, productos, envíos, tracking, entregas, mocks y comprobantes.'
    },

    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Servidor local'
      }
    ],

    tags: [
      { name: 'Health' },
      { name: 'Users' },
      { name: 'Products' },
      { name: 'Shipments' },
      { name: 'Deliveries' },
      { name: 'Mocks' },
      { name: 'Uploads' },
      { name: 'Logger' }
    ],

    components: {
      schemas: {
        User: {
          type: 'object',

          required: [
            'name',
            'email'
          ],

          properties: {
            id: {
              type: 'string'
            },

            name: {
              type: 'string',
              example: 'Juan Meza'
            },

            email: {
              type: 'string',
              format: 'email',
              example: 'juan@example.com'
            },

            role: {
              type: 'string',
              enum: [
                'admin',
                'user',
                'repartidor'
              ],
              example: 'user'
            }
          }
        },

        Product: {
          type: 'object',

          required: [
            'name',
            'price',
            'stock'
          ],

          properties: {
            id: {
              type: 'string'
            },

            name: {
              type: 'string'
            },

            price: {
              type: 'number',
              minimum: 0
            },

            stock: {
              type: 'integer',
              minimum: 0
            },

            status: {
              type: 'string',
              enum: [
                'AVAILABLE',
                'OUT_OF_STOCK'
              ]
            }
          }
        },

        Shipment: {
          type: 'object',

          required: [
            'customerName',
            'deliveryAddress',
            'totalAmount'
          ],

          properties: {
            id: {
              type: 'string'
            },

            trackingCode: {
              type: 'string',
              example: 'SHP-A1B2C3D4'
            },

            userId: {
              type: 'string'
            },

            customerName: {
              type: 'string'
            },

            deliveryAddress: {
              type: 'string'
            },

            totalAmount: {
              type: 'number',
              minimum: 0
            },

            priority: {
              type: 'string',
              enum: [
                'baja',
                'media',
                'alta'
              ]
            },

            status: {
              type: 'string',
              enum: [
                'pendiente',
                'en_camino',
                'entregado',
                'cancelado'
              ]
            }
          }
        },

        Delivery: {
          type: 'object',

          required: [
            'orderId',
            'driverId'
          ],

          properties: {
            id: {
              type: 'string'
            },

            orderId: {
              type: 'string'
            },

            driverId: {
              type: 'string'
            },

            status: {
              type: 'string',
              enum: [
                'asignado',
                'en_curso',
                'completado'
              ]
            },

            assignedAt: {
              type: 'string',
              format: 'date-time'
            },

            deliveredAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },

        Error: {
          type: 'object',

          required: [
            'status',
            'statusCode',
            'errorCode',
            'message'
          ],

          properties: {
            status: {
              type: 'string',
              example: 'fail'
            },

            statusCode: {
              type: 'integer',
              example: 400
            },

            errorCode: {
              type: 'string',
              example: 'ORDER_003'
            },

            message: {
              type: 'string',
              example:
                'El estado indicado para el envío no es válido.'
            }
          }
        },

        Success: {
          type: 'object',

          properties: {
            status: {
              type: 'string',
              example: 'success'
            },

            payload: {
              nullable: true
            }
          }
        }
      }
    }
  },

  apis: [
    './src/docs/*.js'
  ]
};

export const swaggerSpec =
  swaggerJSDoc(swaggerOptions);