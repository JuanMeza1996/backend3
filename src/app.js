import express from 'express';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';

import {
  swaggerSpec
} from './config/swagger.config.js';

import {
  config,
  isProduction
} from './config/env.config.js';

import {
  logger
} from './utils/logger.js';

import userRoutes
  from './routes/user.routes.js';

import productRoutes
  from './routes/product.routes.js';

import orderRoutes
  from './routes/order.routes.js';

import deliveryRoutes
  from './routes/delivery.routes.js';

import mockRoutes
  from './routes/mock.routes.js';

import loggerRoutes
  from './routes/logger.routes.js';

import uploadRoutes
  from './routes/upload.routes.js';

import {
  notFoundMiddleware
} from './middlewares/notFound.middleware.js';

import {
  errorHandler
} from './middlewares/errorHandler.js';

const app =
  express();

app.disable(
  'x-powered-by'
);

app.use(
  express.json({
    limit: '1mb'
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: '1mb'
  })
);

app.get(
  '/health',
  (req, res) => {
    const states = [
      'disconnected',
      'connected',
      'connecting',
      'disconnecting'
    ];

    const database =
      states[
        mongoose.connection
          .readyState
      ] || 'unknown';

    const healthy =
      database === 'connected';

    res
      .status(
        healthy ? 200 : 503
      )
      .json({
        status:
          healthy
            ? 'OK'
            : 'DEGRADED',

        environment:
          config.nodeEnv,

        database,

        uptime:
          Math.floor(
            process.uptime()
          ),

        timestamp:
          new Date().toISOString()
      });
  }
);

app.use(
  '/api/docs',
  swaggerUi.serve,
  swaggerUi.setup(
    swaggerSpec
  )
);

app.use(
  '/api/users',
  userRoutes
);

app.use(
  '/api/products',
  productRoutes
);

app.use(
  '/api/orders',
  orderRoutes
);

app.use(
  '/api/deliveries',
  deliveryRoutes
);

app.use(
  '/api/uploads',
  uploadRoutes
);

if (!isProduction) {
  app.use(
    '/api/mocks',
    mockRoutes
  );

  app.use(
    '/api/logger-test',
    loggerRoutes
  );
}

app.use(
  notFoundMiddleware
);

app.use(
  errorHandler
);

app.locals.logger =
  logger;

export default app;