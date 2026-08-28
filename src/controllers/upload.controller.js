import { UploadService } from '../services/upload.service.js';

const uploadService = new UploadService();

export class UploadController {
  async uploadDocument(req, res, next) {
    try {
      const savedDocument = await uploadService.saveDocumentMetadata(req.file);
      res.status(201).json({
        status: 'success',
        message: 'Archivo subido y metadatos registrados con éxito',
        payload: savedDocument
      });
    } catch (error) {
      next(error);
    }
  }
}
