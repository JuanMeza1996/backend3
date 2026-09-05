import { ProductService } from '../services/product.service.js';

const productService = new ProductService();

export class ProductController {
  async getProducts(req, res, next) {
    try {
      const products = await productService.getProducts();
      res.status(200).json({ status: 'success', payload: products });
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req, res, next) {
    try {
      const newProduct = await productService.createProduct(req.body);
      res.status(201).json({ status: 'success', payload: newProduct });
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      const product = await productService.getProductById(req.params.id);
      res.status(200).json({ status: 'success', payload: product });
    } catch (error) {
      next(error);
    }
  }
}