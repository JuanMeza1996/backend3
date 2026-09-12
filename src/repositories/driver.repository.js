import { DriverModel } from '../models/driver.model.js';

export class DriverRepository {
  async findAll() {
    return DriverModel
      .find()
      .sort({ createdAt: -1 })
      .lean();
  }

  async findById(id) {
    return DriverModel
      .findById(id)
      .lean();
  }

  async create(data) {
    return DriverModel.create(data);
  }
}