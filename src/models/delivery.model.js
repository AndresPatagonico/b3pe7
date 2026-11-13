import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'orders', required: true },
    delivery_man: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    shipping_address: { type: String, required: true },
    status: { type: String, default: 'ASSIGNED' }
}, { timestamps: true });

export const DeliveryModel = mongoose.model('deliveries', deliverySchema);