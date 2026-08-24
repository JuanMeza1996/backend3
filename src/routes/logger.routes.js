import { Router } from 'express';
import { logger } from '../utils/logger.js';

const router = Router();

router.get('/', (req, res) => {
  logger.debug('Log de prueba: DEBUG');
  logger.http('Log de prueba: HTTP');
  logger.info('Log de prueba: INFO');
  logger.warning('Log de prueba: WARNING');
  logger.error('Log de prueba: ERROR');
  logger.fatal('Log de prueba: FATAL');

  res.json({ status: 'success', message: 'Logs generados exitosamente' });
});

export default router;