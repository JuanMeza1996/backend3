export const ErrorDictionary = {
  // Errores de Negocio / Dominio
  USER_NOT_FOUND: {
    code: 'USER_001',
    message: 'El usuario especificado no existe.',
    statusCode: 404
  },
  INVALID_ORDER_STATUS: {
    code: 'ORDER_001',
    message: 'El estado del pedido proporcionado es inválido.',
    statusCode: 400
  },
  
  // Módulo de Mocks
  MOCK_INVALID_COUNT: {
    code: 'MOCK_001',
    message: 'La cantidad de mocks debe ser un número entero mayor a cero.',
    statusCode: 400
  },
  MOCK_DB_INSERTION_FAILED: {
    code: 'MOCK_002',
    message: 'Ocurrió un error al insertar los datos de prueba en la base de datos.',
    statusCode: 500
  },

  // Errores Generales
  INTERNAL_SERVER_ERROR: {
    code: 'SYS_001',
    message: 'Ocurrió un error interno e inesperado en el servidor.',
    statusCode: 500
  }
};