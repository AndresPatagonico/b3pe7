import mongoose from 'mongoose';
import { PRODUCT_STATUS } from '../utils/constants.js';

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    category: { type: String, required: true },
    status: { 
        type: String, 
        required: true, 
        default: PRODUCT_STATUS.AVAILABLE,
        enum: Object.values(PRODUCT_STATUS) 
    }
}, { timestamps: true });

export const ProductModel = mongoose.model('products', productSchema);