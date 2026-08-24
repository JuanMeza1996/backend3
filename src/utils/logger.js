import winston from 'winston';
import 'winston-daily-rotate-file';

const customLevels = {
  levels: { fatal: 0, error: 1, warning: 2, info: 3, http: 4, debug: 5 },
  colors: { fatal: 'magenta', error: 'red', warning: 'yellow', info: 'green', http: 'cyan', debug: 'blue' }
};

winston.addColors(customLevels.colors);

const isProduction = process.env.NODE_ENV === 'production';

export const logger = winston.createLogger({
  levels: customLevels.levels,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      level: isProduction ? 'info' : 'debug',
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
      )
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxFiles: '14d'
    })
  ]
});