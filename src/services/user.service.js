import { UserModel } from '../models/user.model.js';
import { AppError } from '../errors/AppError.js';
import { ErrorDictionary } from '../constants/errorDictionary.js';

export class UserService {
  async getUsers() {
    return await UserModel.find();
  }

  async createUser(userData) {
    const existingUser = await UserModel.findOne({ email: userData.email });
    if (existingUser) {
      throw new AppError(ErrorDictionary.USER_001 || {
        statusCode: 409,
        errorCode: 'USER_001',
        message: 'El email ingresado ya se encuentra registrado.'
      });
    }
    return await UserModel.create(userData);
  }

  async getUserById(id) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new AppError(ErrorDictionary.USER_002 || {
        statusCode: 404,
        errorCode: 'USER_002',
        message: 'El usuario solicitado no existe.'
      });
    }
    return user;
  }
}