import {
  OrderService
} from '../services/order.service.js';

const service =
  new OrderService();

export class OrderController {
  async getOrders(
    req,
    res,
    next
  ) {
    try {
      const result =
        await service.getOrders({
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

  async createOrder(
    req,
    res,
    next
  ) {
    try {
      const order =
        await service.createOrder(
          req.body
        );

      res.status(201).json({
        status: 'success',
        payload: order
      });
    } catch (error) {
      next(error);
    }
  }

  async getOrderById(
    req,
    res,
    next
  ) {
    try {
      const order =
        await service.getOrderById(
          req.params.id
        );

      res.json({
        status: 'success',
        payload: order
      });
    } catch (error) {
      next(error);
    }
  }

  async updateOrder(
    req,
    res,
    next
  ) {
    try {
      const order =
        await service.updateOrder(
          req.params.id,
          req.body
        );

      res.json({
        status: 'success',
        payload: order
      });
    } catch (error) {
      next(error);
    }
  }

  async tracking(
    req,
    res,
    next
  ) {
    try {
      const result =
        await service.getTracking(
          req.params.trackingCode
        );

      res.json({
        status: 'success',
        payload: result
      });
    } catch (error) {
      next(error);
    }
  }
}