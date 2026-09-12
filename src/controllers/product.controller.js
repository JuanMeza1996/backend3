import {
  ProductService
} from '../services/product.service.js';

const service =
  new ProductService();

export class ProductController {
  async getProducts(
    req,
    res,
    next
  ) {
    try {
      const result =
        await service.getProducts({
          page:
            Number(req.query.page) || 1,

          limit:
            Number(req.query.limit) || 20
        });

      res.json({
        status: 'success',
        payload: result
      });
    } catch (error) {
      next(error);
    }
  }

  async createProduct(
    req,
    res,
    next
  ) {
    try {
      const product =
        await service.createProduct(
          req.body
        );

      res.status(201).json({
        status: 'success',
        payload: product
      });
    } catch (error) {
      next(error);
    }
  }

  async getProductById(
    req,
    res,
    next
  ) {
    try {
      const product =
        await service.getProductById(
          req.params.id
        );

      res.json({
        status: 'success',
        payload: product
      });
    } catch (error) {
      next(error);
    }
  }
}