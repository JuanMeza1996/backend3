import {
  Schema,
  model
} from 'mongoose';

const documentSchema = new Schema(
  {
    filename: {
      type: String,
      required: true
    },

    originalname: {
      type: String,
      required: true
    },

    mimetype: {
      type: String,
      required: true
    },

    size: {
      type: Number,
      required: true
    },

    path: {
      type: String,
      required: true
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },

    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order'
    },

    deliveryId: {
      type: Schema.Types.ObjectId,
      ref: 'Delivery'
    },

    type: {
      type: String,
      enum: [
        'user_document',
        'shipment_receipt'
      ],
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const DocumentModel =
  model('Document', documentSchema);