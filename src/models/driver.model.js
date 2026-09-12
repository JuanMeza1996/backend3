import {
  Schema,
  model
} from 'mongoose';

const driverSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      trim: true
    },

    vehicle: {
      type: String,
      required: true,
      trim: true
    },

    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const DriverModel =
  model('Driver', driverSchema);