import {
  MockService
} from '../services/mock.service.js';

const service =
  new MockService();

export class MockController {
  getUsers(
    req,
    res,
    next
  ) {
    try {
      res.json({
        status: 'success',
        payload:
          service.users(
            req.query.qty
          )
      });
    } catch (error) {
      next(error);
    }
  }

  getProducts(
    req,
    res,
    next
  ) {
    try {
      res.json({
        status: 'success',
        payload:
          service.products(
            req.query.qty
          )
      });
    } catch (error) {
      next(error);
    }
  }

  getDrivers(
    req,
    res,
    next
  ) {
    try {
      res.json({
        status: 'success',
        payload:
          service.drivers(
            req.query.qty
          )
      });
    } catch (error) {
      next(error);
    }
  }

  getOrders(
    req,
    res,
    next
  ) {
    try {
      res.json({
        status: 'success',
        payload:
          service.orders(
            req.query.qty
          )
      });
    } catch (error) {
      next(error);
    }
  }

  async seed(
    req,
    res,
    next
  ) {
    try {
      const result =
        await service.seed(
          req.body
        );

      res.status(201).json({
        status: 'success',
        payload: result
      });
    } catch (error) {
      next(error);
    }
  }
}