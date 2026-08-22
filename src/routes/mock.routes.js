import { Router } from 'express';
import { getMockUsers, seedDatabase } from '../controllers/mock.controller.js';

const router = Router();

router.get('/users', getMockUsers);

router.post('/seed', seedDatabase);

export default router;