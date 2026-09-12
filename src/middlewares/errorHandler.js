import multer from 'multer';

import { AppError } from '../errors/AppError.js';
import {
  ErrorDictionary
} from '../constants/errorDictionary.js';

import {
  logger
} from '../utils/logger.js';

import {
  isDevelopment
} from '../config/env.config.js';

export const errorHandler = (
  err,
  req,
  res,
  next
) => {
  let error = err;

  if (
    err instanceof multer.MulterError
  ) {
    if (
      err.code ===
      'LIMIT_FILE_SIZE'
    ) {
      error =
        new AppError(
          ErrorDictionary.FILE_TOO_LARGE
        );
    } else {
      error =
        new AppError(
          ErrorDictionary.FILE_UPLOAD_ERROR,
          err.message
        );
    }
  }

  if (
    err?.name ===
    'ValidationError'
  ) {
    error =
      new AppError(
        ErrorDictionary.INVALID_DATA,
        Object.values(err.errors)
          .map(item => item.message)
          .join(', ')
      );
  }

  if (
    err?.name === 'CastError'
  ) {
    error =
      new AppError(
        ErrorDictionary.INVALID_ID
      );
  }

  if (
    err?.code === 11000
  ) {
    error =
      new AppError(
        ErrorDictionary.EMAIL_ALREADY_REGISTERED
      );
  }

  const statusCode =
    error.statusCode || 500;

  const errorCode =
    error.errorCode ||
    ErrorDictionary
      .INTERNAL_SERVER_ERROR
      .errorCode;

  const message =
    statusCode >= 500 &&
    !error.isOperational &&
    !isDevelopment
      ? ErrorDictionary
          .INTERNAL_SERVER_ERROR
          .message
      : (
          error.message ||
          ErrorDictionary
            .INTERNAL_SERVER_ERROR
            .message
        );

  logger.log({
    level:
      statusCode >= 500
        ? 'error'
        : 'warn',

    message:
      `${req.method} ` +
      `${req.originalUrl} ` +
      `${statusCode} ` +
      `${errorCode} - ` +
      `${error.message}`
  });

  const response = {
    status:
      statusCode >= 500
        ? 'error'
        : 'fail',

    statusCode,

    errorCode,

    message
  };

  if (isDevelopment) {
    response.stack =
      error.stack;
  }

  res
    .status(statusCode)
    .json(response);
};