import { Router } from 'express';
import { MockController } from '../controllers/mock.controller.js';

const router = Router();

/**
 * @swagger
 * /api/mocks/users:
 *   get:
 *     summary: Genera usuarios falsos en memoria
 *     tags: [Mocks]
 *     parameters:
 *       - in: query
 *         name: qty
 *         schema:
 *           type: integer
 *         description: Cantidad de usuarios (por defecto 10)
 *     responses:
 *       200:
 *         description: Usuarios generados con exito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 count:
 *                   type: integer
 *                   example: 10
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       400:
 *         description: Cantidad invalida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/users', MockController.getMockUsers);

/**
 * @swagger
 * /api/mocks/products:
 *   get:
 *     summary: Genera productos falsos en memoria
 *     tags: [Mocks]
 *     parameters:
 *       - in: query
 *         name: qty
 *         schema:
 *           type: integer
 *         description: Cantidad de productos (por defecto 10)
 *     responses:
 *       200:
 *         description: Productos generados con exito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 count:
 *                   type: integer
 *                   example: 10
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       400:
 *         description: Cantidad invalida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/products', MockController.getMockProducts);

/**
 * @swagger
 * /api/mocks/seed:
 *   post:
 *     summary: Insercion masiva de datos en MongoDB (Seed)
 *     tags: [Mocks]
 *     parameters:
 *       - in: query
 *         name: qty
 *         schema:
 *           type: integer
 *         description: Cantidad de entidades a generar
 *     responses:
 *       201:
 *         description: Base de datos poblada con exito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Parametro no valido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/seed', MockController.seedData);

export const mockRouter = router;