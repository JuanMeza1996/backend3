import { MockRepository } from '../repositories/mock.repository.js';
import { generateMockUsers, generateMockProducts } from '../utils/mock.generator.js';

export class MockService {
    constructor() {
        this.mockRepository = new MockRepository();
    }

    getUsers(qty) {
        return generateMockUsers(Number(qty) || 5);
    }

    getProducts(qty) {
        return generateMockProducts(Number(qty) || 5);
    }

    async seedData(qtyUsers = 5, qtyProducts = 5) {
        // 1. Inserción de usuarios
        const mockUsers = generateMockUsers(Number(qtyUsers));
        const insertedUsers = await this.mockRepository.insertUsers(mockUsers);

        // 2. Inserción de productos
        const mockProducts = generateMockProducts(Number(qtyProducts));
        const insertedProducts = await this.mockRepository.insertProducts(mockProducts);

        return {
            usersInserted: insertedUsers.length,
            productsInserted: insertedProducts.length
        };
    }
}