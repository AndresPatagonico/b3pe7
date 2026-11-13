import { logger } from '../utils/logger.js';

export const errorHandler = (error, req, res, next) => {
    const statusCode = error.code || 500;
    const errorName = error.name || 'InternalServerError';

    // Clasificación de logs según severidad
    if (statusCode >= 500) {
        logger.fatal(`Falla crítica del sistema [${errorName}]: ${error.message} - Stack: ${error.stack}`);
    } else if (statusCode >= 400 && statusCode < 500) {
        logger.error(`Error de cliente [${errorName}]: ${error.message}`);
    } else {
        logger.warning(`Advertencia [${errorName}]: ${error.message}`);
    }

    return res.status(statusCode).json({
        status: 'error',
        error: errorName,
        message: error.message,
        cause: error.cause || null
    });
};