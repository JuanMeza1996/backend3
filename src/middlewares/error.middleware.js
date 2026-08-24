import { logger } from '../utils/logger.js';

export const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (statusCode >= 500) {
    logger.error(`[500] ${req.method} ${req.originalUrl} - ${message}`);
  } else {
    logger.warning(`[${statusCode}] ${req.method} ${req.originalUrl} - ${message}`);
  }

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};