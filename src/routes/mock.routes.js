import { Router } from 'express';
import { getMockUsers, seedDatabase } from '../controllers/mock.controller.js';

const router = Router();

/**
 * @openapi
 * /api/mocks/users:
 *   get:
 *     summary: Obtener usuarios simulados
 *     tags: [Mocks]
 *     parameters:
 *       - in: query
 *         name: qty
 *         schema:
 *           type: integer
 *         description: Cantidad de usuarios
 *     responses:
 *       200:
 *         description: Éxito
 */
router.get('/users', getMockUsers);

/**
 * @openapi
 * /api/mocks/seed:
 *   post:
 *     summary: Carga masiva de datos de prueba en MongoDB
 *     tags: [Mocks]
 *     responses:
 *       201:
 *         description: Datos insertados
 */
router.post('/seed', seedDatabase);

export default router;