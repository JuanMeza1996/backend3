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
      {
        name: 'Health',
        description: 'Estado general de la API y conexión con MongoDB'
      },
      {
        name: 'Users',
        description: 'Gestión de usuarios'
      },
      {
        name: 'Products',
        description: 'Gestión de productos'
      },
      {
        name: 'Orders',
        description: 'Gestión de envíos y tracking'
      },
      {
        name: 'Deliveries',
        description: 'Gestión de entregas'
      },
      {
        name: 'Mocks',
        description: 'Generación y persistencia de datos simulados'
      },
      {
        name: 'Uploads',
        description: 'Carga de documentos y comprobantes'
      },
      {
        name: 'Logger',
        description: 'Prueba del sistema de logging'
      }
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
            _id: {
              type: 'string',
              example: '64f10c57d2ad98a0b1234567'
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
            },

            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2026-09-12T20:00:00.000Z'
            },

            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2026-09-12T20:00:00.000Z'
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
            _id: {
              type: 'string',
              example: '64f10c57d2ad98a0b1234568'
            },

            name: {
              type: 'string',
              example: 'Caja mediana'
            },

            price: {
              type: 'number',
              minimum: 0,
              example: 1500
            },

            stock: {
              type: 'integer',
              minimum: 0,
              example: 10
            },

            status: {
              type: 'string',
              enum: [
                'AVAILABLE',
                'OUT_OF_STOCK'
              ],
              example: 'AVAILABLE'
            },

            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2026-09-12T20:00:00.000Z'
            },

            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2026-09-12T20:00:00.000Z'
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
            _id: {
              type: 'string',
              example: '64f10c57d2ad98a0b1234569'
            },

            trackingCode: {
              type: 'string',
              example: 'SHP-A1B2C3D4'
            },

            userId: {
              type: 'string',
              nullable: true,
              example: '64f10c57d2ad98a0b1234567'
            },

            customerName: {
              type: 'string',
              example: 'Carlos López'
            },

            deliveryAddress: {
              type: 'string',
              example: 'Av. Libertador 1234'
            },

            totalAmount: {
              type: 'number',
              minimum: 0,
              example: 2500
            },

            priority: {
              type: 'string',
              enum: [
                'baja',
                'media',
                'alta'
              ],
              example: 'alta'
            },

            status: {
              type: 'string',
              enum: [
                'pendiente',
                'en_camino',
                'entregado',
                'cancelado'
              ],
              example: 'pendiente'
            },

            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2026-09-12T20:00:00.000Z'
            },

            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2026-09-12T20:00:00.000Z'
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
            _id: {
              type: 'string',
              example: '64f10c57d2ad98a0b1234570'
            },

            orderId: {
              type: 'string',
              example: '64f10c57d2ad98a0b1234569'
            },

            driverId: {
              type: 'string',
              example: '64f10c57d2ad98a0b1234571'
            },

            status: {
              type: 'string',
              enum: [
                'asignado',
                'en_curso',
                'completado'
              ],
              example: 'asignado'
            },

            assignedAt: {
              type: 'string',
              format: 'date-time',
              example: '2026-09-12T20:00:00.000Z'
            },

            deliveredAt: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              example: '2026-09-12T22:30:00.000Z'
            },

            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2026-09-12T20:00:00.000Z'
            },

            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2026-09-12T20:00:00.000Z'
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
          },

          example: {
            status: 'fail',
            statusCode: 400,
            errorCode: 'ORDER_003',
            message:
              'El estado indicado para el envío no es válido.'
          }
        },

        Success: {
          type: 'object',

          required: [
            'status'
          ],

          properties: {
            status: {
              type: 'string',
              example: 'success'
            },

            payload: {
              nullable: true,
              description:
                'Contenido de la respuesta. Su estructura depende del endpoint.'
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