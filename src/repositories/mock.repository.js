import { UserModel } from '../models/user.model.js';
import { ProductModel } from '../models/product.model.js';

export class MockRepository {
    async insertUsers(usersData) {
        return await UserModel.insertMany(usersData);
    }

    async insertProducts(productsData) {
        return await ProductModel.insertMany(productsData);
    }
}