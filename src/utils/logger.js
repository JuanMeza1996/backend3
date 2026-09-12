import winston from 'winston';

import {
  config,
  isProduction
} from '../config/env.config.js';

const {
  combine,
  timestamp,
  errors,
  json,
  colorize,
  simple
} = winston.format;

const fileFormat = combine(
  timestamp(),
  errors({
    stack: true
  }),
  json()
);

const transports = [
  /*
   * Solo errores.
   */
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
    format: fileFormat
  }),

  /*
   * Registro general.
   * Incluye error, warn, info y los niveles
   * permitidos por LOG_LEVEL.
   */
  new winston.transports.File({
    filename: 'logs/combined.log',
    format: fileFormat
  })
];

/*
 * La consola se utiliza únicamente fuera
 * del entorno de producción.
 */
if (!isProduction) {
  transports.push(
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp({
          format: 'HH:mm:ss'
        }),
        simple()
      )
    })
  );
}

export const logger =
  winston.createLogger({
    level: config.logLevel,
    format: fileFormat,
    transports,
    exitOnError: false
  });