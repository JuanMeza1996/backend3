import { Router } from 'express';
import { UploadController } from '../controllers/upload.controller.js';
import { uploadMiddleware } from '../config/multer.config.js';

const router = Router();
const uploadController = new UploadController();

/**
 * @openapi
 * /api/uploads/document:
 *   post:
 *     summary: Subir un documento comprobante
 *     tags: [Uploads]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               document:
 *                 type: string
 *                 format: binary
 *                 description: Archivo comprobante (JPG, PNG o PDF, máx 5MB)
 *     responses:
 *       201:
 *         description: Archivo subido y metadatos registrados en BD.
 *       400:
 *         description: Tipo de archivo no permitido o sin archivo enviado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/document', uploadMiddleware.single('document'), (req, res, next) => 
  uploadController.uploadDocument(req, res, next)
);

export default router;
