import { Router } from 'express';

const router = Router();

/**
 * @openapi
 * /api/deliveries:
 *   get:
 *     summary: Obtener listado de entregas
 *     tags: [Deliveries]
 *     responses:
 *       200:
 *         description: Lista de entregas.
 */
router.get('/', (req, res) => {
  res.json({ status: 'success', payload: [] });
});

export default router;
