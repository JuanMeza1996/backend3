import 'dotenv/config';

const REQUIRED_ENV_VARS = ['PORT', 'MONGO_URI', 'NODE_ENV'];

for (const envVar of REQUIRED_ENV_VARS) {
  if (!process.env[envVar]) {
    console.error(`[FATAL ERROR] La variable de entorno crítica '${envVar}' no está definida. La aplicación no puede iniciar.`);
    process.exit(1);
  }
}

export const config = {
  port: process.env.PORT || 8080,
  mongoUri: process.env.MONGO_URI,
  mongoUriTest: process.env.MONGO_URI_TEST || process.env.MONGO_URI,
  nodeEnv: process.env.NODE_ENV || 'development',
  logLevel: process.env.LOG_LEVEL || 'info',
  jwtSecret: process.env.JWT_SECRET || 'default_secret_key'
};