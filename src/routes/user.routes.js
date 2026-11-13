import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { upload } from '../config/multer.config.js';
import { handleMulterError } from '../middlewares/multerError.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get('/', UserController.getUsers);

/**
 * @swagger
 * /api/users/{uid}/documents:
 *   post:
 *     summary: Carga un documento asociado a un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               document:
 *                 type: string
 *                 format: binary
 *                 description: Archivo PDF o Imagen (Máx 5MB)
 *               docType:
 *                 type: string
 *                 example: DNI
 *                 description: Tipo de documento (DNI, Licencia, CUIT)
 *     responses:
 *       200:
 *         description: Documento subido y registrado exitosamente
 *       400:
 *         description: Archivo faltante, tipo invalido o tamaño excedido
 *       404:
 *         description: Usuario no encontrado
 */
router.post(
    '/:uid/documents',
    upload.single('document'),
    handleMulterError,
    UserController.uploadUserDocument
);

export const userRouter = router;