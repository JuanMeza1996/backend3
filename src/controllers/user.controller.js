import { UserService } from '../services/user.service.js';

const userService = new UserService();

export class UserController {
  async getUsers(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      
      const result = await userService.getUsers({ page, limit });
      res.status(200).json({ status: 'success', payload: result });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      const newUser = await userService.createUser(req.body);
      res.status(201).json({ status: 'success', payload: newUser });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.status(200).json({ status: 'success', payload: user });
    } catch (error) {
      next(error);
    }
  }
}