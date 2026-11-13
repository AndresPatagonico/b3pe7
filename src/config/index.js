import dotenv from 'dotenv';

dotenv.config();

const requiredEnvs = ['PORT', 'MONGODB_URI'];

    for (const env of requiredEnvs) {
        if (!process.env[env]) {
            throw new Error(`[Config Error]: La variable de entorno ${env} es obligatoria y no está definida.`);
        }
    }

export const config = {
    port: process.env.PORT || 8080,
    mongoUri: process.env.MONGODB_URI,
    nodeEnv: process.env.NODE_ENV || 'development',
};

if (!config.mongoUri) {
    console.error("Error crítico: Falta la variable MONGODB_URI en el archivo .env");
    process.exit(1);
}