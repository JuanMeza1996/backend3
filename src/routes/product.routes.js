import { Router } from 'express';
import { ProductController } from '../controllers/product.controller.js';

const router = Router();
const productController = new ProductController();

router.get('/', (req, res) => productController.getProducts(req, res));
router.post('/', (req, res) => productController.createProduct(req, res));

export default router;