import {
  fakerES as faker
} from '@faker-js/faker';

import {
  USER_ROLES,
  PRODUCT_STATUS,
  ORDER_STATUS,
  ORDER_PRIORITY,
  DELIVERY_STATUS
} from '../constants/index.js';

export const generateMockUsers = (
  qty = 5
) =>
  Array.from(
    { length: qty },
    () => ({
      name:
        faker.person.fullName(),

      email:
        faker.internet
          .email()
          .toLowerCase(),

      role:
        faker.helpers.arrayElement(
          Object.values(USER_ROLES)
        )
    })
  );

export const generateMockProducts = (
  qty = 5
) =>
  Array.from(
    { length: qty },
    () => ({
      name:
        faker.commerce.productName(),

      price:
        Number(
          faker.commerce.price({
            min: 100,
            max: 5000
          })
        ),

      stock:
        faker.number.int({
          min: 0,
          max: 100
        }),

      status:
        faker.helpers.arrayElement(
          Object.values(PRODUCT_STATUS)
        )
    })
  );

export const generateMockDrivers = (
  qty = 5
) =>
  Array.from(
    { length: qty },
    () => ({
      name:
        faker.person.fullName(),

      email:
        faker.internet
          .email()
          .toLowerCase(),

      phone:
        faker.phone.number(),

      vehicle:
        faker.helpers.arrayElement([
          'Moto',
          'Auto',
          'Bicicleta'
        ]),

      isAvailable:
        faker.datatype.boolean()
    })
  );

export const generateMockOrders = (
  qty = 5
) =>
  Array.from(
    { length: qty },
    () => ({
      customerName:
        faker.person.fullName(),

      deliveryAddress:
        faker.location.streetAddress(),

      totalAmount:
        Number(
          faker.commerce.price({
            min: 500,
            max: 15000
          })
        ),

      priority:
        faker.helpers.arrayElement(
          Object.values(
            ORDER_PRIORITY
          )
        ),

      status:
        faker.helpers.arrayElement(
          Object.values(
            ORDER_STATUS
          )
        )
    })
  );

export const generateMockDeliveries = (
  qty = 5
) =>
  Array.from(
    { length: qty },
    () => ({
      status:
        faker.helpers.arrayElement(
          Object.values(
            DELIVERY_STATUS
          )
        )
    })
  );