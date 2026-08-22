import { fakerES as faker } from '@faker-js/faker';
import { ROLES } from '../constants/roles.constants.js'; 
import { PRODUCT_STATUS } from '../constants/index.js'; 

export const generateMockUsers = (qty = 5) => {
    const users = [];
    const availableRoles = Object.values(ROLES || { CLIENT: 'cliente', DELIVERER: 'repartidor', ADMIN: 'admin' });

    for (let i = 0; i < qty; i++) {
        users.push({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            role: faker.helpers.arrayElement(availableRoles)
        });
    }
    return users;
};

export const generateMockProducts = (qty = 5) => {
    const products = [];
    const statuses = Object.values(PRODUCT_STATUS || { AVAILABLE: 'disponible', OUT_OF_STOCK: 'sin_stock' });

    for (let i = 0; i < qty; i++) {
        products.push({
            name: faker.commerce.productName(),
            price: Number(faker.commerce.price({ min: 100, max: 5000 })),
            stock: faker.number.int({ min: 1, max: 100 }),
            status: faker.helpers.arrayElement(statuses)
        });
    }
    return products;
};