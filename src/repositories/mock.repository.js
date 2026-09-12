import { UserModel } from '../models/user.model.js';
import { ProductModel } from '../models/product.model.js';
import { DriverModel } from '../models/driver.model.js';
import { OrderModel } from '../models/order.model.js';
import { DeliveryModel } from '../models/delivery.model.js';

export class MockRepository {
  async insertUsers(data) {
    return UserModel.insertMany(data);
  }

  async insertProducts(data) {
    return ProductModel.insertMany(data);
  }

  async insertDrivers(data) {
    return DriverModel.insertMany(data);
  }

  async insertOrders(data) {
    return OrderModel.insertMany(data);
  }

  async insertDeliveries(data) {
    return DeliveryModel.insertMany(data);
  }
}