import { MockRepository } from '../repositories/mock.repository.js';
import { generateMockUsers, generateMockOrders } from '../utils/mock.generator.js';

export class MockService {
    constructor() {
        this.mockRepository = new MockRepository();
    }

    getUsers(qty) {
        return generateMockUsers(Number(qty) || 5);
    }

    getOrders(qty) {
        return generateMockOrders(Number(qty) || 5);
    }

    async seedData(qtyUsers = 5, qtyOrders = 5) {
        // 1. Inserción de usuarios
        const mockUsers = generateMockUsers(Number(qtyUsers));
        const insertedUsers = await this.mockRepository.insertUsers(mockUsers);
        const userIds = insertedUsers.map(u => u._id);

        // 2. Inserción de pedidos relacionados a esos usuarios
        const mockOrders = generateMockOrders(Number(qtyOrders), userIds);
        const insertedOrders = await this.mockRepository.insertOrders(mockOrders);

        return {
            usersInserted: insertedUsers.length,
            ordersInserted: insertedOrders.length
        };
    }
}