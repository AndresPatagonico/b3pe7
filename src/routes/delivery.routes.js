import { Router } from 'express';
import { DeliveryController } from '../controllers/delivery.controller.js';

const router = Router();

/**
 * @swagger
 * /api/deliveries:
 *   get:
 *     summary: Obtiene todas las entregas
 *     tags: [Deliveries]
 *     responses:
 *       200:
 *         description: Lista de entregas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Delivery'
 *       500:
 *         description: Error interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', DeliveryController.getDeliveries);

export const deliveryRouter = router;