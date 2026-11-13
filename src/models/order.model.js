import mongoose from 'mongoose';
import { ORDER_STATUS, PRIORITIES } from '../utils/constants.js';

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }],
    total_price: { type: Number, required: true },
    priority: { 
        type: String, 
        required: true, 
        default: PRIORITIES.MEDIUM,
        enum: Object.values(PRIORITIES) 
    },
    status: { 
        type: String, 
        required: true, 
        default: ORDER_STATUS.PENDING,
        enum: Object.values(ORDER_STATUS) 
    },
    receipts: [
        {
            name: { type: String, required: true },
            originalName: { type: String, required: true },
            reference: { type: String, required: true },
            mimeType: { type: String, required: true },
            size: { type: Number, required: true },
            uploadedAt: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true });

export const OrderModel = mongoose.model('orders', orderSchema);