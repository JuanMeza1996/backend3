export const ErrorDictionary = {
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    errorCode: 'SYS_001',
    message: 'Error interno del servidor.'
  },

  INVALID_ID: {
    statusCode: 400,
    errorCode: 'SYS_002',
    message: 'El identificador proporcionado no es válido.'
  },

  ROUTE_NOT_FOUND: {
    statusCode: 404,
    errorCode: 'SYS_003',
    message: 'El recurso solicitado no existe.'
  },

  INVALID_DATA: {
    statusCode: 400,
    errorCode: 'SYS_004',
    message: 'Los datos enviados son inválidos.'
  },

  INVALID_QUANTITY: {
    statusCode: 400,
    errorCode: 'MOCK_001',
    message:
      'La cantidad enviada debe ser un número entero entre 1 y 100.'
  },

  EMAIL_ALREADY_REGISTERED: {
    statusCode: 409,
    errorCode: 'USER_001',
    message:
      'El email ingresado ya se encuentra registrado.'
  },

  USER_NOT_FOUND: {
    statusCode: 404,
    errorCode: 'USER_002',
    message:
      'El usuario solicitado no existe.'
  },

  INVALID_USER_DATA: {
    statusCode: 400,
    errorCode: 'USER_003',
    message:
      'Los datos del usuario son inválidos o están incompletos.'
  },

  PRODUCT_ALREADY_EXISTS: {
    statusCode: 409,
    errorCode: 'PRODUCT_001',
    message:
      'El producto ya existe.'
  },

  INVALID_PRODUCT_DATA: {
    statusCode: 400,
    errorCode: 'PRODUCT_002',
    message:
      'Los datos del producto son inválidos o están incompletos.'
  },

  PRODUCT_NOT_FOUND: {
    statusCode: 404,
    errorCode: 'PRODUCT_003',
    message:
      'El producto solicitado no existe.'
  },

  INVALID_ORDER_DATA: {
    statusCode: 400,
    errorCode: 'ORDER_001',
    message:
      'Los datos del envío son inválidos o están incompletos.'
  },

  ORDER_NOT_FOUND: {
    statusCode: 404,
    errorCode: 'ORDER_002',
    message:
      'El envío solicitado no existe.'
  },

  INVALID_ORDER_STATUS: {
    statusCode: 400,
    errorCode: 'ORDER_003',
    message:
      'El estado indicado para el envío no es válido.'
  },

  DELIVERY_NOT_FOUND: {
    statusCode: 404,
    errorCode: 'DELIVERY_001',
    message:
      'La entrega solicitada no existe.'
  },

  INVALID_DELIVERY_STATUS: {
    statusCode: 400,
    errorCode: 'DELIVERY_002',
    message:
      'El estado indicado para la entrega no es válido.'
  },

  FILE_REQUIRED: {
    statusCode: 400,
    errorCode: 'FILE_001',
    message:
      'Debe adjuntar un archivo.'
  },

  INVALID_FILE_TYPE: {
    statusCode: 400,
    errorCode: 'FILE_002',
    message:
      'Tipo de archivo no permitido. Solo se aceptan JPG, PNG o PDF.'
  },

  FILE_TOO_LARGE: {
    statusCode: 413,
    errorCode: 'FILE_003',
    message:
      'El archivo supera el tamaño máximo permitido de 5 MB.'
  },

  FILE_UPLOAD_ERROR: {
    statusCode: 400,
    errorCode: 'FILE_004',
    message:
      'No fue posible procesar el archivo enviado.'
  }
};