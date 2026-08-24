export class AppError extends Error {
  constructor(errorKey, customMessage = null) {
    const errorData = errorKey || {};
    super(customMessage || errorData.message || 'Error interno');
    
    this.statusCode = errorData.statusCode || 500;
    this.errorCode = errorData.code || 'UNKNOWN_ERROR';
    this.status = `${this.statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // Permite diferenciar errores controlados de bugs no previstos

    Error.captureStackTrace(this, this.constructor);
  }
}