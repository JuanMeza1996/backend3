import {
  UploadService
} from '../services/upload.service.js';

const service =
  new UploadService();

export class UploadController {
  async uploadDocument(
    req,
    res,
    next
  ) {
    try {
      const document =
        await service
          .saveDocumentMetadata(
            req.file,
            req.body
          );

      res.status(201).json({
        status: 'success',
        message:
          'Archivo subido y metadatos registrados correctamente.',
        payload: document
      });
    } catch (error) {
      next(error);
    }
  }
}