import { Router } from 'express';
import { OrderController } from '../controllers/order.controller.js';
import { upload } from '../config/multer.config.js';
import { handleMulterError } from '../middlewares/multerError.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Obtiene todos los pedidos
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *   post:
 *     summary: Crea un nuevo pedido
 *     tags: [Orders]
 *     responses:
 *       201:
 *         description: Pedido creado exitosamente
 *       400:
 *         description: Datos de pedido inválidos o incompletos
 */
router.get('/', OrderController.getOrders);
router.post('/', OrderController.createOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Obtiene un pedido por ID
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido no encontrado
 */
router.get('/:id', OrderController.getOrderById);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Actualiza el estado de un pedido
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Estado actualizado exitosamente
 *       400:
 *         description: Estado no válido
 *       404:
 *         description: Pedido no encontrado
 */
router.put('/:id/status', OrderController.updateOrderStatus);

/**
 * @swagger
 * /api/orders/{oid}/receipts:
 *   post:
 *     summary: Carga un comprobante asociado a un pedido
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: oid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del pedido
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               receipt:
 *                 type: string
 *                 format: binary
 *                 description: Comprobante en formato PDF o Imagen (Máx 5MB)
 *     responses:
 *       200:
 *         description: Comprobante subido y registrado exitosamente
 *       400:
 *         description: Archivo faltante o formato inválido
 *       404:
 *         description: Pedido no encontrado
 */
router.post(
    '/:oid/receipts',
    upload.single('receipt'),
    handleMulterError,
    OrderController.uploadOrderReceipt
);

export const orderRouter = router;