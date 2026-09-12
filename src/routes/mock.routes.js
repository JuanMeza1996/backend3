import {
  Router
} from 'express';

import {
  MockController
} from '../controllers/mock.controller.js';

const router =
  Router();

const controller =
  new MockController();

router.get(
  '/users',
  (req, res, next) =>
    controller.getUsers(
      req,
      res,
      next
    )
);

router.get(
  '/products',
  (req, res, next) =>
    controller.getProducts(
      req,
      res,
      next
    )
);

router.get(
  '/drivers',
  (req, res, next) =>
    controller.getDrivers(
      req,
      res,
      next
    )
);

router.get(
  '/orders',
  (req, res, next) =>
    controller.getOrders(
      req,
      res,
      next
    )
);

router.post(
  '/seed',
  (req, res, next) =>
    controller.seed(
      req,
      res,
      next
    )
);

export default router;