import { MockService } from '../services/mock.service.js';

const mockService = new MockService();

export const getMockUsers = (req, res) => {
    try {
        const { qty } = req.query;
        const users = mockService.getUsers(qty);
        res.status(200).json({ status: 'success', payload: users });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const seedDatabase = async (req, res) => {
    try {
        const { qtyUsers = 10, qtyOrders = 10 } = req.query;
        const result = await mockService.seedData(qtyUsers, qtyOrders);
        res.status(201).json({
            status: 'success',
            message: 'Carga de datos simulados realizada con éxito',
            payload: result
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};