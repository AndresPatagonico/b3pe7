import express from 'express';
import { productRouter } from './routes/product.routes.js';
import { userRouter } from './routes/user.routes.js';
import { mockRouter } from './routes/mock.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { logger } from './utils/logger.js';
import { loggerRouter } from './routes/logger.routes.js';
import { setupSwagger } from './config/swagger.config.js';
import { orderRouter } from './routes/order.routes.js';
import { deliveryRouter } from './routes/delivery.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupSwagger(app);

// Registrar las rutas
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/mocks', mockRouter);
app.use('/api/loggerTest', loggerRouter);
app.use('/api', loggerRouter);
app.use('/api/orders', orderRouter);
app.use('/api/deliveries', deliveryRouter);

app.get('/', (req, res) => {
    logger.http('Acceso a ruta raíz /');
    res.json({ status: 'success', message: 'API ShipNow funcionando correctamente' });
});

app.use(errorHandler);

// Exportamos app para que la usen Supertest y server.js
export default app;