import {
  Schema,
  model
} from 'mongoose';

import {
  USER_ROLES
} from '../constants/index.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.USER
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const UserModel =
  model('User', userSchema);