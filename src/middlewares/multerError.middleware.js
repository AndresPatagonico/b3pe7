import multer from 'multer';
import { logger } from '../utils/logger.js';

export const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        logger.error(`Error de Multer: ${err.message}`);
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                status: 'error',
                error: 'LIMIT_FILE_SIZE',
                message: 'El archivo excede el tamaño máximo permitido de 5MB'
            });
        }
        return res.status(400).json({
            status: 'error',
            error: err.code,
            message: err.message
        });
    }

    if (err && err.customCode === 'INVALID_FILE_TYPE') {
        return res.status(400).json({
            status: 'error',
            error: 'INVALID_FILE_TYPE',
            message: err.message
        });
    }

    next(err);
};