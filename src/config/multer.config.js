import fs from 'fs';
import path from 'path';
import multer from 'multer';

import { config } from './env.config.js';
import { ALLOWED_FILE_TYPES } from '../constants/index.js';
import { AppError } from '../errors/AppError.js';
import { ErrorDictionary } from '../constants/errorDictionary.js';

const uploadPath = path.resolve(config.uploadDir);

fs.mkdirSync(uploadPath, {
  recursive: true
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      `${Date.now()}-${Math.round(Math.random() * 1e9)}` +
      path.extname(file.originalname).toLowerCase();

    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    return cb(
      new AppError(
        ErrorDictionary.INVALID_FILE_TYPE
      )
    );
  }

  cb(null, true);
};

export const uploadMiddleware = multer({
  storage,
  fileFilter,
  limits: {
    fileSize:
      config.maxFileSizeMb * 1024 * 1024,

    files: 1
  }
});