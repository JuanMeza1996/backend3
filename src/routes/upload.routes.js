import { Router } from 'express';
import { upload } from '../config/multer.config.js';
import { logger } from '../utils/logger.js';

const router = Router();

router.post('/document', upload.single('document'), (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'error', message: 'Es necesario adjuntar un archivo' });
    }

    const fileMetadata = {
      filename: req.file.filename,
      originalname: req.file.originalname,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
      uploadedAt: new Date()
    };

    logger.info(`Archivo subido con éxito: ${fileMetadata.filename}`);

    res.status(201).json({
      status: 'success',
      message: 'Archivo subido y metadatos registrados',
      payload: fileMetadata
    });
  } catch (error) {
    next(error);
  }
});

export default router;