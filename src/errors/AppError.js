export class AppError extends Error {
  constructor(
    errorData = {},
    customMessage = null
  ) {
    super(
      customMessage ||
      errorData.message ||
      'Error interno del servidor.'
    );

    this.name = 'AppError';

    this.statusCode =
      errorData.statusCode || 500;

    this.errorCode =
      errorData.errorCode ||
      errorData.code ||
      'SYS_001';

    this.status =
      this.statusCode >= 400 &&
      this.statusCode < 500
        ? 'fail'
        : 'error';

    this.isOperational = true;

    Error.captureStackTrace(
      this,
      this.constructor
    );
  }
}