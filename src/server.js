import app from './app.js';
import mongoose from 'mongoose';
import { config } from './config/index.js';

async function startServer() {
    try {
        await mongoose.connect(config.mongoUri);
        console.log('Base de datos conectada exitosamente');

        app.listen(config.port, () => {
            console.log(`Servidor corriendo en el puerto: ${config.port} [Ambiente: ${config.nodeEnv}]`);
        });
    } catch (error) {
        console.error(`Error al conectar con la base de datos: ${error.message}`);
        process.exit(1);
    }
}

startServer();