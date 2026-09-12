import { DeliveryModel } from '../models/delivery.model.js';

export class DeliveryRepository {
  async findAll({
    page = 1,
    limit = 20
  } = {}) {
    const skip = (page - 1) * limit;

    const [
      deliveries,
      total
    ] = await Promise.all([
      DeliveryModel
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      DeliveryModel.countDocuments()
    ]);

    return {
      docs: deliveries,
      totalDocs: total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  async findById(id) {
    return DeliveryModel
      .findById(id)
      .lean();
  }

  async create(data) {
    return DeliveryModel.create(data);
  }

  async updateById(id, data) {
    return DeliveryModel
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