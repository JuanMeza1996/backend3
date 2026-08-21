import { ProductModel } from '../models/product.model.js';

export class ProductRepository {
    async findAll() {
        return await ProductModel.find({}, { __v: 0 }).lean();
    }

    async findById(id) {
        return await ProductModel.findById(id, { __v: 0 }).lean();
    }

    async create(productData) {
        return await ProductModel.create(productData);
    }
}