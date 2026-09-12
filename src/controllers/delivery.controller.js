import {
  DeliveryService
} from '../services/delivery.service.js';

const service =
  new DeliveryService();

export class DeliveryController {
  async getDeliveries(
    req,
    res,
    next
  ) {
    try {
      const result =
        await service.getDeliveries({
          page:
            Number(req.query.page) || 1,

          limit:
            Number(req.query.limit) || 20
        });

      res.json({
        status: 'success',
        payload: result
      });
    } catch (error) {
      next(error);
    }
  }

  async getDeliveryById(
    req,
    res,
    next
  ) {
    try {
      const delivery =
        await service.getDeliveryById(
          req.params.id
        );

      res.json({
        status: 'success',
        payload: delivery
      });
    } catch (error) {
      next(error);
    }
  }

  async createDelivery(
    req,
    res,
    next
  ) {
    try {
      const delivery =
        await service.createDelivery(
          req.body
        );

      res.status(201).json({
        status: 'success',
        payload: delivery
      });
    } catch (error) {
      next(error);
    }
  }

  async updateDelivery(
    req,
    res,
    next
  ) {
    try {
      const delivery =
        await service.updateDelivery(
          req.params.id,
          req.body
        );

      res.json({
        status: 'success',
        payload: delivery
      });
    } catch (error) {
      next(error);
    }
  }
}