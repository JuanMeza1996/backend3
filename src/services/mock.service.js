import { MockRepository } from '../repositories/mock.repository.js';
import { generateMockUsers, generateMockProducts } from '../utils/mock.generator.js';
import { AppError } from '../errors/AppError.js';
import { ErrorDictionary } from '../constants/errorDictionary.js';

export class MockService {
    constructor() {
        this.mockRepository = new MockRepository();
    }

    _validateQuantity(qty) {
        const parsedQty = Number(qty);
        if (isNaN(parsedQty) || !Number.isInteger(parsedQty) || parsedQty <= 0) {
            throw new AppError(ErrorDictionary.MOCK_INVALID_COUNT);
        }
        return parsedQty;
    }

    getUsers(qty = 5) {
        const validQty = this._validateQuantity(qty);
        return generateMockUsers(validQty);
    }

    getProducts(qty = 5) {
        const validQty = this._validateQuantity(qty);
        return generateMockProducts(validQty);
    }

    async seedData(qtyUsers = 5, qtyProducts = 5) {
        const validUsersQty = this._validateQuantity(qtyUsers);
        const validProductsQty = this._validateQuantity(qtyProducts);

        try {
            // 1. Inserción de usuarios
            const mockUsers = generateMockUsers(validUsersQty);
            const insertedUsers = await this.mockRepository.insertUsers(mockUsers);

            // 2. Inserción de productos
            const mockProducts = generateMockProducts(validProductsQty);
            const insertedProducts = await this.mockRepository.insertProducts(mockProducts);

            return {
                usersInserted: insertedUsers.length,
                productsInserted: insertedProducts.length
            };
        } catch (error) {
            if (error instanceof AppError) throw error;

            throw new AppError(ErrorDictionary.MOCK_DB_INSERTION_FAILED);
        }
    }
}