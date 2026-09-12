import {
  Router
} from 'express';

import {
  ProductController
} from '../controllers/product.controller.js';

const router =
  Router();

const controller =
  new ProductController();

router.get(
  '/',
  (req, res, next) =>
    controller.getProducts(
      req,
      res,
      next
    )
);

router.post(
  '/',
  (req, res, next) =>
    controller.createProduct(
      req,
      res,
      next
    )
);

router.get(
  '/:id',
  (req, res, next) =>
    controller.getProductById(
      req,
      res,
      next
    )
);

export default router;