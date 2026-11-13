import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { logger } from '../utils/logger.js';

// Asegurar que las carpetas de destino existan
const ensureDirectoryExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

// Storage dinámico según el destino del archivo
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = 'uploads/documents';

        if (req.baseUrl.includes('orders') || req.baseUrl.includes('deliveries')) {
            folder = 'uploads/receipts';
        } else if (file.fieldname === 'profile') {
            folder = 'uploads/profiles';
        }

        ensureDirectoryExists(folder);
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = path.extname(file.originalname);
        const nameWithoutExt = path.basename(file.originalname, ext).replace(/\s+/g, '_');
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
});

// Filtro de extensiones / mimetypes permitidos
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        logger.warning(`Intento de carga de archivo no permitido. MimeType: ${file.mimetype}`);
        const error = new Error('INVALID_FILE_TYPE');
        error.customCode = 'INVALID_FILE_TYPE';
        error.message = 'Formato de archivo no permitido. Solo se aceptan PDF, JPEG, PNG y WEBP.';
        cb(error, false);
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // Limite de 5 MB
    }
});