import winston from 'winston';
import 'winston-daily-rotate-file';
import { config } from '../config/index.js';

// Definición de niveles y colores personalizados
const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'magenta',
        warning: 'yellow',
        info: 'green',
        http: 'cyan',
        debug: 'blue'
    }
};

winston.addColors(customLevelsOptions.colors);

// Formato común con timestamp
const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
);

// Configuración de transports según entorno
const transportsList = [
    // Consola siempre activa
    new winston.transports.Console({
        level: config.nodeEnv === 'production' ? 'info' : 'debug',
        format: winston.format.combine(
        winston.format.colorize({ all: true }),
        logFormat
        )
    })
];

// En producción o desarrollo, persistimos errores y fatales con rotación en carpeta /logs
transportsList.push(
    new winston.transports.DailyRotateFile({
        dirname: 'logs',
        filename: 'error-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        level: 'error', // Captura 'error' y 'fatal'
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        format: logFormat
    })
);

export const logger = winston.createLogger({
    levels: customLevelsOptions.levels,
    format: logFormat,
    transports: transportsList
});