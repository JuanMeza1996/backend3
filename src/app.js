import express from 'express';
import mongoose from 'mongoose';
import { config } from './config/env.config.js';
import productRoutes from './routes/product.routes.js';
import userRoutes from './routes/user.routes.js';
import mockRoutes from './routes/mock.routes.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { AppError } from './errors/AppError.js';
import { ErrorDictionary } from './constants/errorDictionary.js';

const app = express();

app.use(express.json());

// Registro de rutas
app.use('/api/mocks', mockRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// 2. Captura de rutas no encontradas (404)
app.use((req, res, next) => {
    next(new AppError(ErrorDictionary.ROUTE_NOT_FOUND || { 
        message: `Ruta no encontrada: ${req.originalUrl}`, 
        statusCode: 404, 
        code: 'NOT_FOUND' 
    }));
});

// 3. MIDDLEWARE GLOBAL DE ERRORES
app.use(errorHandler);

mongoose.connect(config.mongoUri)
    .then(() => {
        console.log('✅ Conexión exitosa a MongoDB');
        app.listen(config.port, () => {
            console.log(`🚀 Servidor ShipNow corriendo en puerto ${config.port}`);
        });
    })
    .catch(err => {
        console.error('❌ Error de conexión a la base de datos:', err.message);
    });