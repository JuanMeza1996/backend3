export const ErrorDictionary = {
  // Mocks
  INVALID_QUANTITY: {
    statusCode: 400,
    errorCode: 'MOCK_001',
    message: 'La cantidad enviada no es un número entero positivo válido.'
  },
  // Users
  EMAIL_ALREADY_REGISTERED: {
    statusCode: 409,
    errorCode: 'USER_001',
    message: 'El email ingresado ya se encuentra registrado.'
  },
  USER_NOT_FOUND: {
    statusCode: 404,
    errorCode: 'USER_002',
    message: 'El usuario solicitado no existe.'
  },
  // Products
  INVALID_PRODUCT_DATA: {
    statusCode: 400,
    errorCode: 'PRODUCT_001',
    message: 'Los datos del producto son inválidos o están incompletos.'
  },
  PRODUCT_NOT_FOUND: {
    statusCode: 404,
    errorCode: 'PRODUCT_002',
    message: 'El producto solicitado no existe.'
  },
  // Sistema
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    errorCode: 'SYS_001',
    message: 'Error interno del servidor.'
  }
};
