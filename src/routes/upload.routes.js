import {
  Router
} from 'express';

import {
  UploadController
} from '../controllers/upload.controller.js';

import {
  uploadMiddleware
} from '../config/multer.config.js';

const router =
  Router();

const controller =
  new UploadController();

router.post(
  '/document',

  uploadMiddleware.single(
    'document'
  ),

  (req, res, next) =>
    controller.uploadDocument(
      req,
      res,
      next
    )
);

export default router;