import { ProductRepository } from '../repositories/product.repository.js';
import { PRODUCT_STATUS } from '../constants/index.js';
import { AppError } from '../errors/AppError.js';
import { ErrorDictionary } from '../constants/errorDictionary.js';

const productRepository = new ProductRepository();

export class ProductService {
    async getAllProducts() {
        const products = await productRepository.findAll();
        // Lógica de negocio: actualiza dinámicamente si hay productos sin stock
        return products.map(product => ({
            ...product,
            status: product.stock > 0 ? PRODUCT_STATUS.AVAILABLE : PRODUCT_STATUS.OUT_OF_STOCK
        }));
    }

    async createProduct(productData) {
        if (!productData.name || productData.price <= 0) {
            throw new AppError(ErrorDictionary.INVALID_PRODUCT_DATA);
        }
        
        // Asignación de estado inicial según regla de negocio
        productData.status = productData.stock > 0 ? PRODUCT_STATUS.AVAILABLE : PRODUCT_STATUS.OUT_OF_STOCK;
        return await productRepository.create(productData);
    }
}
