import 'dotenv/config';

const positiveInteger = (value, fallback) => {
  const parsed = Number(value);

  return Number.isInteger(parsed) && parsed > 0
    ? parsed
    : fallback;
};

export const config = {
  port: positiveInteger(process.env.PORT, 8080),

  nodeEnv: process.env.NODE_ENV || 'development',

  mongoUri:
    process.env.MONGO_URI ||
    'mongodb://localhost:27017/shipnow',

  mongoUriTest:
    process.env.MONGO_URI_TEST ||
    'mongodb://localhost:27017/shipnow_test',

  logLevel: process.env.LOG_LEVEL || 'info',

  maxFileSizeMb:
    positiveInteger(process.env.MAX_FILE_SIZE_MB, 5),

  uploadDir:
    process.env.UPLOAD_DIR || 'uploads/documents'
};

export const isProduction =
  config.nodeEnv === 'production';

export const isTest =
  config.nodeEnv === 'test';

export const isDevelopment =
  config.nodeEnv === 'development';