import { Schema, model } from 'mongoose';
import { ORDER_STATUS } from '../constants/index.js';

const orderSchema = new Schema({
  customerName: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: Object.values(ORDER_STATUS), 
    default: ORDER_STATUS.PENDING 
  }
}, { timestamps: true });

export const OrderModel = model('Order', orderSchema);
