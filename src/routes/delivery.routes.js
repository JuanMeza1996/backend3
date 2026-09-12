import {
  Router
} from 'express';

import {
  DeliveryController
} from '../controllers/delivery.controller.js';

const router =
  Router();

const controller =
  new DeliveryController();

router.get(
  '/',
  (req, res, next) =>
    controller.getDeliveries(
      req,
      res,
      next
    )
);

router.post(
  '/',
  (req, res, next) =>
    controller.createDelivery(
      req,
      res,
      next
    )
);

router.get(
  '/:id',
  (req, res, next) =>
    controller.getDeliveryById(
      req,
      res,
      next
    )
);

router.put(
  '/:id',
  (req, res, next) =>
    controller.updateDelivery(
      req,
      res,
      next
    )
);

export default router;