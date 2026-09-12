import { OrderModel } from '../models/order.model.js';

export class OrderRepository {
  async findAll({
    page = 1,
    limit = 20
  } = {}) {
    const skip = (page - 1) * limit;

    const [
      orders,
      total
    ] = await Promise.all([
      OrderModel
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      OrderModel.countDocuments()
    ]);

    return {
      docs: orders,
      totalDocs: total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  async findById(id) {
    return OrderModel
      .findById(id)
      .lean();
  }

  async findByTrackingCode(
    trackingCode
  ) {
    return OrderModel
      .findOne({ trackingCode })
      .lean();
  }

  async create(data) {
    return OrderModel.create(data);
  }

  async updateById(id, data) {
    return OrderModel
      .findByIdAndUpdate(
        id,
        data,
        {
          new: true,
          runValidators: true
        }
      )
      .lean();
  }
}