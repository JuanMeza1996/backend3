import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ShipNow API - Documentación',
      version: '1.0.0',
      description: 'API REST para gestión de envíos, usuarios, pedidos, entregas y mocks.'
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Servidor Local'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '66bc1234567890abcdef1234' },
            name: { type: 'string', example: 'Juan Meza' },
            email: { type: 'string', example: 'juan@example.com' },
            role: { type: 'string', example: 'user', enum: ['admin', 'user', 'repartidor'] }
          }
        },
        Product: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '66bc1234567890abcdef5678' },
            name: { type: 'string', example: 'Caja de Envío M' },
            price: { type: 'number', example: 1250.50 },
            stock: { type: 'integer', example: 50 },
            status: { type: 'string', example: 'AVAILABLE' }
          }
        },
        Order: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '66bc1234567890abcdef9012' },
            customerName: { type: 'string', example: 'Carlos Pérez' },
            deliveryAddress: { type: 'string', example: 'Av. Libertador 1234' },
            totalAmount: { type: 'number', example: 4500.00 },
            status: { type: 'string', example: 'pendiente' }
          }
        },
        Delivery: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '66bc1234567890abcdef3456' },
            orderId: { type: 'string', example: '66bc1234567890abcdef9012' },
            driverId: { type: 'string', example: '66bc1234567890abcdef7890' },
            status: { type: 'string', example: 'asignado' }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'error' },
            statusCode: { type: 'integer', example: 400 },
            errorCode: { type: 'string', example: 'INVALID_DATA' },
            message: { type: 'string', example: 'Los datos provistos son inválidos.' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
