import { faker } from '@faker-js/faker';
import { USER_ROLES, ORDER_STATUS, DELIVERY_STATUS } from '../constants/index.js';
import { UserModel } from '../models/user.model.js';
import { DriverModel } from '../models/driver.model.js';
import { OrderModel } from '../models/order.model.js';
import { DeliveryModel } from '../models/delivery.model.js';

export const generateMockUsers = (qty = 5) => {
  const users = [];
  const roles = Object.values(USER_ROLES);
  for (let i = 0; i < qty; i++) {
    users.push({
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      role: faker.helpers.arrayElement(roles)
    });
  }
  return users;
};

export const generateMockDrivers = (qty = 5) => {
  const drivers = [];
  for (let i = 0; i < qty; i++) {
    drivers.push({
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      phone: faker.phone.number(),
      vehicle: faker.helpers.arrayElement(['Moto', 'Auto', 'Bicicleta']),
      isAvailable: faker.datatype.boolean()
    });
  }
  return drivers;
};

export const generateMockOrders = (qty = 5) => {
  const orders = [];
  const statuses = Object.values(ORDER_STATUS);
  for (let i = 0; i < qty; i++) {
    orders.push({
      customerName: faker.person.fullName(),
      deliveryAddress: faker.location.streetAddress(),
      totalAmount: parseFloat(faker.commerce.price({ min: 500, max: 15000 })),
      status: faker.helpers.arrayElement(statuses)
    });
  }
  return orders;
};

export const seedDatabaseService = async (usersQty = 5, ordersQty = 5, driversQty = 3) => {
  // 1. Insertar Usuarios
  const mockUsers = generateMockUsers(usersQty);
  const insertedUsers = await UserModel.insertMany(mockUsers);

  // 2. Insertar Repartidores
  const mockDrivers = generateMockDrivers(driversQty);
  const insertedDrivers = await DriverModel.insertMany(mockDrivers);

  // 3. Insertar Pedidos
  const mockOrders = generateMockOrders(ordersQty);
  const insertedOrders = await OrderModel.insertMany(mockOrders);

  // 4. Crear Entregas vinculando Pedidos y Repartidores
  const mockDeliveries = [];
  const deliveryStatuses = Object.values(DELIVERY_STATUS);

  for (let i = 0; i < Math.min(insertedOrders.length, insertedDrivers.length); i++) {
    mockDeliveries.push({
      orderId: insertedOrders[i]._id,
      driverId: insertedDrivers[i]._id,
      status: faker.helpers.arrayElement(deliveryStatuses)
    });
  }

  const insertedDeliveries = await DeliveryModel.insertMany(mockDeliveries);

  return {
    users: insertedUsers.length,
    drivers: insertedDrivers.length,
    orders: insertedOrders.length,
    deliveries: insertedDeliveries.length
  };
};
