import express from 'express';
import mongoose from 'mongoose';
import { config } from './config/env.config.js';
import productRoutes from './routes/product.routes.js';
import userRoutes from './routes/user.routes.js';
import mockRoutes from './routes/mock.routes.js';


const app = express();

app.use(express.json());
app.use('/api/mocks', mockRoutes);
// Registro de rutas
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

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