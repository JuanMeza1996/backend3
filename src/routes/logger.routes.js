import {
  Router
} from 'express';

import {
  LoggerController
} from '../controllers/logger.controller.js';

const router =
  Router();

const controller =
  new LoggerController();

router.get(
  '/',
  (req, res) =>
    controller.test(
      req,
      res
    )
);

export default router;