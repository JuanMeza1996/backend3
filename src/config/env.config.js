import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['PORT', 'MONGODB_URI', 'NODE_ENV'];

for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.error(`❌ ERROR CRÍTICO: La variable de entorno ${envVar} no está definida en el archivo .env`);
        process.exit(1); // Detiene la aplicación inmediatamente
    }
}

export const config = {
    port: process.env.PORT || 8080,
    mongoUri: process.env.MONGODB_URI,
    nodeEnv: process.env.NODE_ENV
};