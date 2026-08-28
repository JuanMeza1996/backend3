import { Schema, model } from 'mongoose';

const documentSchema = new Schema({
  filename: { type: String, required: true },
  originalname: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  path: { type: String, required: true }
}, { timestamps: true });

export const DocumentModel = model('Document', documentSchema);
