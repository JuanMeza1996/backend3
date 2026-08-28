import { Schema, model } from 'mongoose';

const driverSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  vehicle: { type: String, required: true },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

export const DriverModel = model('Driver', driverSchema);
