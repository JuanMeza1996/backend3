import { fakerES as faker } from '@faker-js/faker';
import { ROLES } from '../constants/roles.constants.js'; 
import { ORDER_STATUS, ORDER_PRIORITY } from '../constants/orders.constants.js';

export const generateMockUsers = (qty = 5) => {
    const users = [];
    const availableRoles = Object.values(ROLES);

    for (let i = 0; i < qty; i++) {
        users.push({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            role: faker.helpers.arrayElement(availableRoles)
        });
    }
    return users;
};

export const generateMockOrders = (qty = 5, userIds = []) => {
    const orders = [];
    const statuses = Object.values(ORDER_STATUS);
    const priorities = Object.values(ORDER_PRIORITY);

    for (let i = 0; i < qty; i++) {
        orders.push({
            description: faker.commerce.productName(),
            price: Number(faker.commerce.price({ min: 10, max: 500 })),
            status: faker.helpers.arrayElement(statuses),
            priority: faker.helpers.arrayElement(priorities),
            user: userIds.length > 0 ? faker.helpers.arrayElement(userIds) : null
        });
    }
    return orders;
};