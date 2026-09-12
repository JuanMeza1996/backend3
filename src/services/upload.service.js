import mongoose from 'mongoose';

import { AppError } from '../errors/AppError.js';
import { ErrorDictionary } from '../constants/errorDictionary.js';

import { DocumentRepository } from '../repositories/document.repository.js';
import { UserRepository } from '../repositories/user.repository.js';
import { OrderRepository } from '../repositories/order.repository.js';
import { DeliveryRepository } from '../repositories/delivery.repository.js';

export class UploadService {
  constructor(
    documentRepository =
      new DocumentRepository()
  ) {
    this.documentRepository =
      documentRepository;

    this.userRepository =
      new UserRepository();

    this.orderRepository =
      new OrderRepository();

    this.deliveryRepository =
      new DeliveryRepository();
  }

  async saveDocumentMetadata(
    file,
    association = {}
  ) {
    if (!file) {
      throw new AppError(
        ErrorDictionary.FILE_REQUIRED
      );
    }

    const {
      userId,
      orderId,
      deliveryId
    } = association;

    const associations = [
      userId,
      orderId,
      deliveryId
    ].filter(Boolean);

    if (associations.length !== 1) {
      throw new AppError(
        ErrorDictionary.INVALID_DATA,
        'Debe indicar exactamente una asociación: userId, orderId o deliveryId.'
      );
    }

    if (userId) {
      if (
        !mongoose.isValidObjectId(userId)
      ) {
        throw new AppError(
          ErrorDictionary.INVALID_ID
        );
      }

      const user =
        await this.userRepository
          .findById(userId);

      if (!user) {
        throw new AppError(
          ErrorDictionary.USER_NOT_FOUND
        );
      }
    }

    if (orderId) {
      if (
        !mongoose.isValidObjectId(orderId)
      ) {
        throw new AppError(
          ErrorDictionary.INVALID_ID
        );
      }

      const order =
        await this.orderRepository
          .findById(orderId);

      if (!order) {
        throw new AppError(
          ErrorDictionary.ORDER_NOT_FOUND
        );
      }
    }

    if (deliveryId) {
      if (
        !mongoose.isValidObjectId(
          deliveryId
        )
      ) {
        throw new AppError(
          ErrorDictionary.INVALID_ID
        );
      }

      const delivery =
        await this.deliveryRepository
          .findById(deliveryId);

      if (!delivery) {
        throw new AppError(
          ErrorDictionary.DELIVERY_NOT_FOUND
        );
      }
    }

    return this.documentRepository.create({
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path,

      userId,
      orderId,
      deliveryId,

      type: userId
        ? 'user_document'
        : 'shipment_receipt'
    });
  }
}