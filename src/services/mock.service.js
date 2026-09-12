import { AppError } from '../errors/AppError.js';
import { ErrorDictionary } from '../constants/errorDictionary.js';
import {
  MAX_MOCK_QUANTITY
} from '../constants/index.js';

import {
  generateMockUsers,
  generateMockProducts,
  generateMockDrivers,
  generateMockOrders
} from '../utils/mock.generator.js';

import {
  MockRepository
} from '../repositories/mock.repository.js';

const validateQty = qty => {
  const value =
    qty === undefined
      ? 5
      : Number(qty);

  if (
    !Number.isInteger(value) ||
    value < 1 ||
    value > MAX_MOCK_QUANTITY
  ) {
    throw new AppError(
      ErrorDictionary.INVALID_QUANTITY
    );
  }

  return value;
};

export class MockService {
  constructor(
    repository = new MockRepository()
  ) {
    this.repository = repository;
  }

  users(qty) {
    return generateMockUsers(
      validateQty(qty)
    );
  }

  products(qty) {
    return generateMockProducts(
      validateQty(qty)
    );
  }

  drivers(qty) {
    return generateMockDrivers(
      validateQty(qty)
    );
  }

  orders(qty) {
    return generateMockOrders(
      validateQty(qty)
    );
  }

  async seed({
    usersQty,
    productsQty,
    driversQty,
    ordersQty
  } = {}) {
    const users =
      await this.repository
        .insertUsers(
          this.users(usersQty)
        );

    const products =
      await this.repository
        .insertProducts(
          this.products(productsQty)
        );

    const drivers =
      await this.repository
        .insertDrivers(
          this.drivers(driversQty)
        );

    const orders =
      await this.repository
        .insertOrders(
          this.orders(ordersQty)
        );

    return {
      users: users.length,
      products: products.length,
      drivers: drivers.length,
      orders: orders.length
    };
  }
}