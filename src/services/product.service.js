import mongoose from 'mongoose';

import { AppError } from '../errors/AppError.js';
import { ErrorDictionary } from '../constants/errorDictionary.js';
import { ProductRepository } from '../repositories/product.repository.js';

export class ProductService {
  constructor(
    repository = new ProductRepository()
  ) {
    this.repository = repository;
  }

  async getProducts({
    page = 1,
    limit = 20
  } = {}) {
    return this.repository.findAll({
      page,
      limit
    });
  }

  async createProduct(data) {
    if (
      !data?.name ||
      typeof data.price !== 'number' ||
      data.price <= 0 ||
      typeof data.stock !== 'number' ||
      data.stock < 0
    ) {
      throw new AppError(
        ErrorDictionary.INVALID_PRODUCT_DATA
      );
    }

    const existing =
      await this.repository
        .findByName(data.name);

    if (existing) {
      throw new AppError(
        ErrorDictionary.PRODUCT_ALREADY_EXISTS
      );
    }

    return this.repository.create(data);
  }

  async getProductById(id) {
    if (!mongoose.isValidObjectId(id)) {
      throw new AppError(
        ErrorDictionary.INVALID_ID
      );
    }

    const product =
      await this.repository.findById(id);

    if (!product) {
      throw new AppError(
        ErrorDictionary.PRODUCT_NOT_FOUND
      );
    }

    return product;
  }
}