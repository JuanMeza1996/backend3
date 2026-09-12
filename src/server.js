import mongoose from 'mongoose';

import app from './app.js';

import {
  config
} from './config/env.config.js';

import {
  logger
} from './utils/logger.js';

const startServer =
  async () => {
    try {
      await mongoose.connect(
        config.mongoUri
      );

      logger.info(
        'Conexión a MongoDB establecida.'
      );

      const server =
        app.listen(
          config.port,
          () => {
            logger.info(
              `ShipNow escuchando en el puerto ${config.port}.`
            );
          }
        );

      const shutdown =
        async signal => {
          logger.info(
            `Recibida señal ${signal}. Cerrando servidor.`
          );

          server.close(
            async () => {
              await mongoose
                .connection
                .close();

              process.exit(0);
            }
          );
        };

      process.on(
        'SIGINT',
        () =>
          shutdown(
            'SIGINT'
          )
      );

      process.on(
        'SIGTERM',
        () =>
          shutdown(
            'SIGTERM'
          )
      );
    } catch (error) {
      logger.error(
        `No fue posible iniciar ShipNow: ${error.message}`
      );

      process.exit(1);
    }
  };

startServer();