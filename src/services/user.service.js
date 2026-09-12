import mongoose from 'mongoose';

import { AppError } from '../errors/AppError.js';
import { ErrorDictionary } from '../constants/errorDictionary.js';
import { USER_ROLES } from '../constants/index.js';
import { UserRepository } from '../repositories/user.repository.js';

export class UserService {
  constructor(
    repository = new UserRepository()
  ) {
    this.repository = repository;
  }

  async getUsers({
    page = 1,
    limit = 10
  } = {}) {
    if (
      !Number.isInteger(page) ||
      page < 1 ||
      !Number.isInteger(limit) ||
      limit < 1 ||
      limit > 100
    ) {
      throw new AppError(
        ErrorDictionary.INVALID_DATA
      );
    }

    return this.repository.findAll({
      page,
      limit
    });
  }

  async createUser(data) {
    if (
      !data?.name ||
      !data?.email
    ) {
      throw new AppError(
        ErrorDictionary.INVALID_USER_DATA
      );
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(data.email)
    ) {
      throw new AppError(
        ErrorDictionary.INVALID_USER_DATA
      );
    }

    if (
      data.role &&
      !Object.values(USER_ROLES)
        .includes(data.role)
    ) {
      throw new AppError(
        ErrorDictionary.INVALID_USER_DATA
      );
    }

    const email =
      data.email.toLowerCase();

    const existing =
      await this.repository
        .findByEmail(email);

    if (existing) {
      throw new AppError(
        ErrorDictionary.EMAIL_ALREADY_REGISTERED
      );
    }

    return this.repository.create({
      ...data,
      email
    });
  }

  async getUserById(id) {
    if (!mongoose.isValidObjectId(id)) {
      throw new AppError(
        ErrorDictionary.INVALID_ID
      );
    }

    const user =
      await this.repository.findById(id);

    if (!user) {
      throw new AppError(
        ErrorDictionary.USER_NOT_FOUND
      );
    }

    return user;
  }
}