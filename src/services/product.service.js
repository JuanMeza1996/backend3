import { ProductModel } from '../models/product.model.js';
import { AppError } from '../errors/AppError.js';
import { ErrorDictionary } from '../constants/errorDictionary.js';

export class ProductService {
  async getProducts() {
    return await ProductModel.find();
  }

  async createProduct(productData) {
    if (!productData.name || !productData.price || productData.price <= 0) {
      throw new AppError(ErrorDictionary.PRODUCT_001 || {
        statusCode: 400,
        errorCode: 'PRODUCT_001',
        message: 'Los datos del producto son inválidos o están incompletos.'
      });
    }
    return await ProductModel.create(productData);
  }

  async getProductById(id) {
    const product = await ProductModel.findById(id);
    if (!product) {
      throw new AppError(ErrorDictionary.PRODUCT_002 || {
        statusCode: 404,
        errorCode: 'PRODUCT_002',
        message: 'El producto solicitado no existe.'
      });
    }
    return product;
  }
}