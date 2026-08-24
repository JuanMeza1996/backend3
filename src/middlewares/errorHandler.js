import { ErrorDictionary } from '../constants/errorDictionary.js';

export const errorHandler = (err, req, res, next) => {
  // Configuración de valores por defecto si no es un AppError
  let statusCode = err.statusCode || 500;
  let response = {
    status: err.status || 'error',
    statusCode: statusCode,
    errorCode: err.errorCode || ErrorDictionary.INTERNAL_SERVER_ERROR.code,
    message: err.message || ErrorDictionary.INTERNAL_SERVER_ERROR.message
  };

  // En entorno de desarrollo (NODE_ENV=development) podés incluir err.stack si lo requerís
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  // Registro de logs en servidor
  console.error(`[ERROR] [${new Date().toISOString()}] ${response.errorCode}: ${err.message}`);

  res.status(statusCode).json(response);
};