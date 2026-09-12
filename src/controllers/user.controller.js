import {
  UserService
} from '../services/user.service.js';

const service =
  new UserService();

export class UserController {
  async getUsers(
    req,
    res,
    next
  ) {
    try {
      const result =
        await service.getUsers({
          page:
            Number(req.query.page) || 1,

          limit:
            Number(req.query.limit) || 10
        });

      res.json({
        status: 'success',
        payload: result
      });
    } catch (error) {
      next(error);
    }
  }

  async createUser(
    req,
    res,
    next
  ) {
    try {
      const user =
        await service.createUser(
          req.body
        );

      res.status(201).json({
        status: 'success',
        payload: user
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(
    req,
    res,
    next
  ) {
    try {
      const user =
        await service.getUserById(
          req.params.id
        );

      res.json({
        status: 'success',
        payload: user
      });
    } catch (error) {
      next(error);
    }
  }
}