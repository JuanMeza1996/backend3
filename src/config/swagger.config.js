import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ShipNow API',
      version: '1.0.0',
      description: 'Documentación oficial de ShipNow API - Sistema de Mocks, Logging, Carga de Archivos y Operaciones'
    },
    servers: [{ url: 'http://localhost:8080' }]
  },
  apis: ['./src/routes/*.js']
};

export const swaggerSpecs = swaggerJSDoc(swaggerOptions);