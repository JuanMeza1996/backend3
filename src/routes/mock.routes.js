import { Router } from 'express';
import { 
  generateMockUsers, 
  generateMockDrivers, 
  generateMockOrders, 
  seedDatabaseService 
} from '../services/mock.service.js';

const router = Router();

// Endpoint de Usuarios
router.get('/users', (req, res) => {
  const qty = parseInt(req.query.qty) || 5;
  res.json({ status: 'success', payload: generateMockUsers(qty) });
});

// Endpoint de Repartidores
router.get('/drivers', (req, res) => {
  const qty = parseInt(req.query.qty) || 5;
  res.json({ status: 'success', payload: generateMockDrivers(qty) });
});

// Endpoint de Pedidos
router.get('/orders', (req, res) => {
  const qty = parseInt(req.query.qty) || 5;
  res.json({ status: 'success', payload: generateMockOrders(qty) });
});

// Seeding en Base de Datos
router.post('/seed', async (req, res, next) => {
  try {
    const { usersQty, ordersQty, driversQty } = req.body;
    const result = await seedDatabaseService(usersQty, ordersQty, driversQty);
    res.status(201).json({ status: 'success', message: 'Seeding completado con éxito', payload: result });
  } catch (error) {
    next(error);
  }
});

export default router;
