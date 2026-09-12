import {
  Schema,
  model
} from 'mongoose';

import {
  ORDER_PRIORITY,
  ORDER_STATUS
} from '../constants/index.js';

const orderSchema = new Schema(
  {
    trackingCode: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100
    },

    deliveryAddress: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 250
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },

    priority: {
      type: String,
      enum: Object.values(ORDER_PRIORITY),
      default: ORDER_PRIORITY.MEDIUM
    },

    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PENDING
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const OrderModel =
  model('Order', orderSchema);