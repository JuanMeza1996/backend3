import { DocumentModel } from '../models/document.model.js';

export class DocumentRepository {
  async create(data) {
    return DocumentModel.create(data);
  }

  async findById(id) {
    return DocumentModel
      .findById(id)
      .lean();
  }

  async findByUserId(userId) {
    return DocumentModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .lean();
  }

  async findByOrderId(orderId) {
    return DocumentModel
      .find({ orderId })
      .sort({ createdAt: -1 })
      .lean();
  }

  async findByDeliveryId(deliveryId) {
    return DocumentModel
      .find({ deliveryId })
      .sort({ createdAt: -1 })
      .lean();
  }
}