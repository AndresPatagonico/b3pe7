import { UserService } from '../services/user.service.js';
import { UserModel } from '../models/user.model.js';
import { logger } from '../utils/logger.js';
import mongoose from 'mongoose';

const userService = new UserService();

export class UserController {
    static async getUsers(req, res, next) {
        try {
            const users = await userService.getUsers();
            return res.status(200).json({ status: 'success', payload: users });
        } catch (error) {
            next(error);
        }
    }

    static async createUser(req, res, next) {
        try {
            const newUser = await userService.createUser(req.body);
            return res.status(201).json({ status: 'success', payload: newUser });
        } catch (error) {
            next(error);
        }
    }

    static async uploadUserDocument(req, res, next) {
        try {
            const { uid } = req.params;
            const { docType } = req.body;
            const file = req.file;

            if (!file) {
                return res.status(400).json({
                    status: 'error',
                    error: 'MISSING_FILE',
                    message: 'No se envió ningún archivo en la petición (campo esperado: "document")'
                });
            }

            const validDocTypes = ['DNI', 'Licencia', 'Comprobante', 'CUIT'];
            if (!docType || !validDocTypes.includes(docType)) {
                return res.status(400).json({
                    status: 'error',
                    error: 'INVALID_DOC_TYPE',
                    message: `El tipo de documento '${docType}' es inválido. Valores permitidos: ${validDocTypes.join(', ')}`
                });
            }

            if (!mongoose.Types.ObjectId.isValid(uid)) {
                return res.status(400).json({
                    status: 'error',
                    error: 'INVALID_ID',
                    message: 'El ID de usuario provisto no es un ObjectId válido'
                });
            }

            const user = await UserModel.findById(uid);
            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    error: 'USER_NOT_FOUND',
                    message: 'El usuario especificado no existe'
                });
            }

            const newDocMetadata = {
                name: file.filename,
                originalName: file.originalname,
                docType,
                reference: file.path,
                mimeType: file.mimetype,
                size: file.size,
                uploadedAt: new Date()
            };

            user.documents.push(newDocMetadata);
            await user.save();

            logger.info(`Documento '${docType}' subido exitosamente para el usuario ${uid}`);

            res.status(200).json({
                status: 'success',
                message: 'Documento subido y registrado correctamente',
                payload: user
            });
        } catch (error) {
            next(error);
        }
    }
}