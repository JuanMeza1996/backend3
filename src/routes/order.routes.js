import {
  Router
} from 'express';

import {
  OrderController
} from '../controllers/order.controller.js';

const router =
  Router();

const controller =
  new OrderController();

router.get(
  '/',
  (req, res, next) =>
    controller.getOrders(
      req,
      res,
      next
    )
);

router.post(
  '/',
  (req, res, next) =>
    controller.createOrder(
      req,
      res,
      next
    )
);

router.get(
  '/tracking/:trackingCode',
  (req, res, next) =>
    controller.tracking(
      req,
      res,
      next
    )
);

router.get(
  '/:id',
  (req, res, next) =>
    controller.getOrderById(
      req,
      res,
      next
    )
);

router.put(
  '/:id',
  (req, res, next) =>
    controller.updateOrder(
      req,
      res,
      next
    )
);

export default router;