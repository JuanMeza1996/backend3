import { ProductModel } from '../models/product.model.js';

export class ProductRepository {
  async findAll({
    page = 1,
    limit = 20
  } = {}) {
    const skip = (page - 1) * limit;

    const [
      products,
      total
    ] = await Promise.all([
      ProductModel
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      ProductModel.countDocuments()
    ]);

    return {
      docs: products,
      totalDocs: total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  async findById(id) {
    return ProductModel
      .findById(id)
      .lean();
  }

  async findByName(name) {
    return ProductModel
      .findOne({ name })
      .lean();
  }

  async create(data) {
    return ProductModel.create(data);
  }
}