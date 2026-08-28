import { UserService } from '../services/user.service.js';

const userService = new UserService();

export class UserController {
    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json({ status: 'success', payload: users });
        } catch (error) {
            next(error);
        }
    }

    async createUser(req, res, next) {
        try {
            const newUser = await userService.registerUser(req.body);
            res.status(201).json({ status: 'success', payload: newUser });
        } catch (error) {
            next(error);
        }
    }
}
