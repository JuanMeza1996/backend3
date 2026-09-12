import winston from 'winston';
import 'winston-daily-rotate-file';

import {
  config,
  isProduction
} from '../config/env.config.js';

const {
  combine,
  timestamp,
  json,
  colorize,
  printf
} = winston.format;

const fileFormat =
  combine(
    timestamp(),
    json()
  );

const consoleFormat =
  combine(
    colorize(),
    timestamp({
      format:
        'YYYY-MM-DD HH:mm:ss'
    }),

    printf(
      ({
        timestamp: time,
        level,
        message
      }) =>
        `${time} [${level.toUpperCase()}]: ${message}`
    )
  );

const transports = [
  new winston.transports.DailyRotateFile({
    filename:
      'logs/error-%DATE%.log',

    datePattern:
      'YYYY-MM-DD',

    level: 'error',

    maxFiles: '14d',

    format: fileFormat
  }),

  new winston.transports.DailyRotateFile({
    filename:
      'logs/combined-%DATE%.log',

    datePattern:
      'YYYY-MM-DD',

    level: config.logLevel,

    maxFiles: '14d',

    format: fileFormat
  })
];

if (!isProduction) {
  transports.push(
    new winston.transports.Console({
      level: config.logLevel,
      format: consoleFormat
    })
  );
}

export const logger =
  winston.createLogger({
    level: config.logLevel,
    format: fileFormat,
    transports
  });