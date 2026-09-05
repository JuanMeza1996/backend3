import { Router } from 'express';
import { ProductController } from '../controllers/product.controller.js';

const router = Router();
const productController = new ProductController();

/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: Obtener catálogo de productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos.
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Products]
 *     responses:
 *       201:
 *         description: Producto creado exitosamente.
 *       400:
 *         description: Datos inválidos o incompletos (PRODUCT_001).
 * 
 * /api/products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado.
 *       404:
 *         description: Producto no encontrado (PRODUCT_002).
 */
router.get('/', (req, res, next) => productController.getProducts(req, res, next));
router.post('/', (req, res, next) => productController.createProduct(req, res, next));
router.get('/:id', (req, res, next) => productController.getProductById(req, res, next));

export default router;