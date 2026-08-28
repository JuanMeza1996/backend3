import { Schema, model } from 'mongoose';
import { DELIVERY_STATUS } from '../constants/index.js';

const deliverySchema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  driverId: { type: Schema.Types.ObjectId, ref: 'Driver', required: true },
  status: { 
    type: String, 
    enum: Object.values(DELIVERY_STATUS), 
    default: DELIVERY_STATUS.ASSIGNED 
  },
  assignedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export const DeliveryModel = model('Delivery', deliverySchema);
