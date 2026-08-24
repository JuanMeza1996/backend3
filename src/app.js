import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpecs } from './config/swagger.config.js';
import mockRoutes from './routes/mock.routes.js';
import loggerRoutes from './routes/logger.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Rutas
app.use('/api/mocks', mockRoutes);
app.use('/api/logger-test', loggerRoutes);
app.use('/api/uploads', uploadRoutes);

// Global Error Handler
app.use(errorMiddleware);

export default app;