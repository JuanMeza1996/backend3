import { UserRepository } from '../repositories/user.repository.js';

const userRepository = new UserRepository();

export class UserService {
    async getAllUsers() {
        return await userRepository.findAll();
    }

    async registerUser(userData) {
        const existingUser = await userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('El email ya está registrado');
        }
        return await userRepository.create(userData);
    }
}