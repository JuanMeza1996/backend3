import { Router } from 'express';

const router = Router();

/**
 * @openapi
 * /api/orders:
 *   get:
 *     summary: Obtener listado de pedidos
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Lista de pedidos.
 */
router.get('/', (req, res) => {
  res.json({ status: 'success', payload: [] });
});

export default router;
