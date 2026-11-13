import mongoose from 'mongoose';
import { OrderModel } from '../models/order.model.js';
import { logger } from '../utils/logger.js';

export class OrderController {
    
    static async getOrders(req, res, next) {
        try {
            const orders = await OrderModel.find();
            return res.status(200).json({ status: 'success', payload: orders });
        } catch (error) {
            next(error);
        }
    }

    static async createOrder(req, res, next) {
        try {
            const { user, products, total_price, priority, status } = req.body;

            if (!user || !products || !Array.isArray(products) || products.length === 0 || !total_price) {
                return res.status(400).json({
                    status: 'error',
                    error: 'INVALID_ORDER_DATA',
                    message: 'Datos de pedido incompletos o inválidos'
                });
            }

            const newOrder = await OrderModel.create({
                user,
                products,
                total_price,
                priority,
                status
            });

            return res.status(201).json({ status: 'success', payload: newOrder });
        } catch (error) {
            next(error);
        }
    }

    static async getOrderById(req, res, next) {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    status: 'error',
                    error: 'INVALID_ID',
                    message: 'El ID de pedido provisto no es un ObjectId válido'
                });
            }

            const order = await OrderModel.findById(id);
            if (!order) {
                return res.status(404).json({
                    status: 'error',
                    error: 'ORDER_NOT_FOUND',
                    message: 'El pedido especificado no existe'
                });
            }

            return res.status(200).json({ status: 'success', payload: order });
        } catch (error) {
            next(error);
        }
    }

    static async updateOrderStatus(req, res, next) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const validStatuses = ['pending', 'shipped', 'delivered', 'cancelled'];

            if (!validStatuses.includes(status)) {
                return res.status(400).json({
                    status: 'error',
                    error: 'INVALID_STATUS',
                    message: `El estado '${status}' no es válido`
                });
            }

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    status: 'error',
                    error: 'INVALID_ID',
                    message: 'El ID de pedido provisto no es un ObjectId válido'
                });
            }

            const order = await OrderModel.findByIdAndUpdate(
                id,
                { status },
                { returnDocument: 'after' }
            );

            if (!order) {
                return res.status(404).json({
                    status: 'error',
                    error: 'ORDER_NOT_FOUND',
                    message: 'El pedido especificado no existe'
                });
            }

            return res.status(200).json({ status: 'success', payload: order });
        } catch (error) {
            next(error);
        }
    }

    static async uploadOrderReceipt(req, res, next) {
        try {
            const { oid } = req.params;
            const file = req.file;

            if (!file) {
                return res.status(400).json({
                    status: 'error',
                    error: 'MISSING_FILE',
                    message: 'No se envió ningún archivo en la petición (campo esperado: "receipt")'
                });
            }

            if (!mongoose.Types.ObjectId.isValid(oid)) {
                return res.status(400).json({
                    status: 'error',
                    error: 'INVALID_ID',
                    message: 'El ID de pedido provisto no es un ObjectId válido'
                });
            }

            const order = await OrderModel.findById(oid);
            if (!order) {
                return res.status(404).json({
                    status: 'error',
                    error: 'ORDER_NOT_FOUND',
                    message: 'El pedido especificado no existe'
                });
            }

            const newReceipt = {
                name: file.filename,
                originalName: file.originalname,
                reference: file.path,
                mimeType: file.mimetype,
                size: file.size,
                uploadedAt: new Date()
            };

            order.receipts.push(newReceipt);
            await order.save();

            logger.info(`Comprobante subido exitosamente para el pedido ${oid}`);

            return res.status(200).json({
                status: 'success',
                message: 'Comprobante subido y registrado correctamente',
                payload: order
            });
        } catch (error) {
            next(error);
        }
    }
}