import { UserModel } from '../models/user.model.js';
import { OrderModel } from '../models/product.model.js'; // Ajusta al modelo de tu proyecto

export class MockRepository {
    async insertUsers(usersData) {
        return await UserModel.insertMany(usersData);
    }

    async insertOrders(ordersData) {
        return await OrderModel.insertMany(ordersData);
    }

    async getAllUserIds() {
        const users = await UserModel.find({}, '_id');
        return users.map(u => u._id);
    }
}