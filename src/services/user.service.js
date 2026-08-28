import { UserRepository } from '../repositories/user.repository.js';
import { AppError } from '../errors/AppError.js';
import { ErrorDictionary } from '../constants/errorDictionary.js';

const userRepository = new UserRepository();

export class UserService {
    async getAllUsers() {
        return await userRepository.findAll();
    }

    async registerUser(userData) {
        const existingUser = await userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new AppError(ErrorDictionary.EMAIL_ALREADY_REGISTERED);
        }
        return await userRepository.create(userData);
    }
}
