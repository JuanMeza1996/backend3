import mongoose from 'mongoose';

import { AppError } from '../errors/AppError.js';
import { ErrorDictionary } from '../constants/errorDictionary.js';
import { DELIVERY_STATUS } from '../constants/index.js';

import { DeliveryRepository } from '../repositories/delivery.repository.js';

export class DeliveryService {
  constructor(
    repository = new DeliveryRepository()
  ) {
    this.repository = repository;
  }

  async getDeliveries(params) {
    return this.repository.findAll(params);
  }

  async getDeliveryById(id) {
    if (!mongoose.isValidObjectId(id)) {
      throw new AppError(
        ErrorDictionary.INVALID_ID
      );
    }

    const delivery =
      await this.repository.findById(id);

    if (!delivery) {
      throw new AppError(
        ErrorDictionary.DELIVERY_NOT_FOUND
      );
    }

    return delivery;
  }

  async createDelivery(data) {
    if (
      !mongoose.isValidObjectId(
        data?.orderId
      ) ||
      !mongoose.isValidObjectId(
        data?.driverId
      )
    ) {
      throw new AppError(
        ErrorDictionary.INVALID_DATA
      );
    }

    if (
      data.status &&
      !Object.values(DELIVERY_STATUS)
        .includes(data.status)
    ) {
      throw new AppError(
        ErrorDictionary.INVALID_DELIVERY_STATUS
      );
    }

    return this.repository.create(data);
  }

  async updateDelivery(id, data) {
    if (!mongoose.isValidObjectId(id)) {
      throw new AppError(
        ErrorDictionary.INVALID_ID
      );
    }

    if (
      data.status &&
      !Object.values(DELIVERY_STATUS)
        .includes(data.status)
    ) {
      throw new AppError(
        ErrorDictionary.INVALID_DELIVERY_STATUS
      );
    }

    const update = {
      ...data
    };

    if (
      data.status ===
      DELIVERY_STATUS.COMPLETED
    ) {
      update.deliveredAt =
        new Date();
    }

    const delivery =
      await this.repository
        .updateById(id, update);

    if (!delivery) {
      throw new AppError(
        ErrorDictionary.DELIVERY_NOT_FOUND
      );
    }

    return delivery;
  }
}