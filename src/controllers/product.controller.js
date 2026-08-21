import { ProductService } from '../services/product.service.js';

const productService = new ProductService();

export class ProductController {
    async getProducts(req, res) {
        try {
            const products = await productService.getAllProducts();
            res.status(200).json({ status: 'success', payload: products });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async createProduct(req, res) {
        try {
            const newProduct = await productService.createProduct(req.body);
            res.status(201).json({ status: 'success', payload: newProduct });
        } catch (error) {
            res.status(400).json({ status: 'error', message: error.message });
        }
    }
}