import {
  logger
} from '../utils/logger.js';

export class LoggerController {
  test(req, res) {
    logger.debug(
      'Evento de prueba DEBUG'
    );

    logger.info(
      'Evento de prueba INFO'
    );

    logger.warn(
      'Evento de prueba WARNING'
    );

    logger.error(
      'Evento de prueba ERROR'
    );

    return res.json({
      status: 'success',
      message:
        'Logger test ejecutado.'
    });
  }
}