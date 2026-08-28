import { DocumentModel } from '../models/document.model.js';
import { AppError } from '../errors/AppError.js';

export class UploadService {
  async saveDocumentMetadata(file) {
    if (!file) {
      throw new AppError({
        statusCode: 400,
        errorCode: 'FILE_002',
        message: 'No se adjuntó ningún archivo en la petición.'
      });
    }

    const documentData = {
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path
    };

    return await DocumentModel.create(documentData);
  }
}
