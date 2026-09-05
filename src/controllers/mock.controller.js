import { generateMockUsers } from '../services/mock.service.js';
import { AppError } from '../errors/AppError.js';
import { ErrorDictionary } from '../constants/errorDictionary.js';

export class MockController {
  getMockUsers(req, res, next) {
    try {
      const { qty } = req.query;

      // Validación para números negativos
      if (qty !== undefined && Number(qty) < 0) {
        throw new AppError(ErrorDictionary.MOCK_001 || {
          statusCode: 400,
          errorCode: 'MOCK_001',
          message: 'La cantidad solicitada debe ser un número positivo.'
        });
      }

      const limit = qty !== undefined ? parseInt(qty) : 5;
      const users = generateMockUsers(limit);

      res.status(200).json({ status: 'success', payload: users });
    } catch (error) {
      next(error);
    }
  }
}