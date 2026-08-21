import { Schema, model } from 'mongoose';
import { USER_ROLES } from '../constants/index.js';

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { 
        type: String, 
        enum: Object.values(USER_ROLES), 
        default: USER_ROLES.USER 
    }
}, { timestamps: true });

export const UserModel = model('User', userSchema);