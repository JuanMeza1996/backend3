import {
  Router
} from 'express';

import {
  UserController
} from '../controllers/user.controller.js';

const router =
  Router();

const controller =
  new UserController();

router.get(
  '/',
  (req, res, next) =>
    controller.getUsers(
      req,
      res,
      next
    )
);

router.post(
  '/',
  (req, res, next) =>
    controller.createUser(
      req,
      res,
      next
    )
);

router.get(
  '/:id',
  (req, res, next) =>
    controller.getUserById(
      req,
      res,
      next
    )
);

export default router;