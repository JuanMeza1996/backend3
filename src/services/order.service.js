import crypto from 'crypto';
import mongoose from 'mongoose';

import { AppError } from '../errors/AppError.js';
import { ErrorDictionary } from '../constants/errorDictionary.js';
import {
  ORDER_STATUS,
  ORDER_PRIORITY
} from '../constants/index.js';

import { OrderRepository } from '../repositories/order.repository.js';

const generateTrackingCode = () => {
  return `SHP-${crypto
    .randomBytes(4)
    .toString('hex')
    .toUpperCase()}`;
};

export class OrderService {
  constructor(
    repository = new OrderRepository()
  ) {
    this.repository = repository;
  }

  async getOrders(params) {
    return this.repository.findAll(params);
  }

  async createOrder(data) {
    if (
      !data?.customerName ||
      !data?.deliveryAddress ||
      typeof data.totalAmount !== 'number' ||
      data.totalAmount < 0
    ) {
      throw new AppError(
        ErrorDictionary.INVALID_ORDER_DATA
      );
    }

    if (
      data.status &&
      !Object.values(ORDER_STATUS)
        .includes(data.status)
    ) {
      throw new AppError(
        ErrorDictionary.INVALID_ORDER_STATUS
      );
    }

    if (
      data.priority &&
      !Object.values(ORDER_PRIORITY)
        .includes(data.priority)
    ) {
      throw new AppError(
        ErrorDictionary.INVALID_ORDER_DATA
      );
    }

    let code =
      generateTrackingCode();

    while (
      await this.repository
        .findByTrackingCode(code)
    ) {
      code =
        generateTrackingCode();
    }

    return this.repository.create({
      ...data,
      trackingCode: code
    });
  }

  async getOrderById(id) {
    if (!mongoose.isValidObjectId(id)) {
      throw new AppError(
        ErrorDictionary.INVALID_ID
      );
    }

    const order =
      await this.repository.findById(id);

    if (!order) {
      throw new AppError(
        ErrorDictionary.ORDER_NOT_FOUND
      );
    }

    return order;
  }

  async updateOrder(id, data) {
    if (!mongoose.isValidObjectId(id)) {
      throw new AppError(
        ErrorDictionary.INVALID_ID
      );
    }

    if (
      data.status &&
      !Object.values(ORDER_STATUS)
        .includes(data.status)
    ) {
      throw new AppError(
        ErrorDictionary.INVALID_ORDER_STATUS
      );
    }

    if (
      data.priority &&
      !Object.values(ORDER_PRIORITY)
        .includes(data.priority)
    ) {
      throw new AppError(
        ErrorDictionary.INVALID_ORDER_DATA
      );
    }

    const order =
      await this.repository
        .updateById(id, data);

    if (!order) {
      throw new AppError(
        ErrorDictionary.ORDER_NOT_FOUND
      );
    }

    return order;
  }

  async getTracking(trackingCode) {
    const order =
      await this.repository
        .findByTrackingCode(
          trackingCode
        );

    if (!order) {
      throw new AppError(
        ErrorDictionary.ORDER_NOT_FOUND
      );
    }

    return {
      trackingCode: order.trackingCode,
      status: order.status,
      updatedAt: order.updatedAt
    };
  }
}