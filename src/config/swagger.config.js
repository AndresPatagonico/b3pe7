import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ShipNow API - Documentacion Oficial',
            version: '1.0.0',
            description: 'API REST profesional desarrollada para ShipNow, estructurada bajo una arquitectura por capas (Controller-Service-Repository), con sistema de mocking, manejo centralizado de errores y logging estructurado con Winston.',
        },
        servers: [
            {
                url: 'http://localhost:8080',
                description: 'Servidor de desarrollo local',
            },
        ],
        tags: [
            { name: 'Users', description: 'Operaciones relacionadas con la gestion de usuarios' },
            { name: 'Products', description: 'Gestion del catalogo de productos' },
            { name: 'Mocks', description: 'Generacion de datos falsos y carga masiva (Seed) en base de datos' },
            { name: 'Logger', description: 'Herramienta interna de diagnostico y validacion de niveles de log' }
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', example: '65f1a2b3c4d5e6f7a8b9c0d1' },
                        first_name: { type: 'string', example: 'Andres' },
                        last_name: { type: 'string', example: 'Lovos' },
                        email: { type: 'string', example: 'andres.lovos@example.com' },
                        role: { type: 'string', enum: ['ADMIN', 'USER', 'DELIVERY'], example: 'USER' }
                    }
                },
                Product: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', example: '65f1a2b3c4d5e6f7a8b9c0d2' },
                        title: { type: 'string', example: 'Monitor 27 pulgadas' },
                        description: { type: 'string', example: 'Monitor Full HD IPS' },
                        price: { type: 'number', example: 150000 },
                        stock: { type: 'integer', example: 25 },
                        category: { type: 'string', example: 'Electronica' },
                        status: { type: 'boolean', example: true }
                    }
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        status: { type: 'string', example: 'error' },
                        error: { type: 'string', example: 'InvalidParamError' },
                        message: { type: 'string', example: 'La cantidad solicitada para la generacion de datos es invalida.' },
                        cause: { type: 'string', example: 'El parametro "qty" recibido ("-2") no es valido.' }
                    }
                },
                SuccessResponse: {
                    type: 'object',
                    properties: {
                        status: { type: 'string', example: 'success' },
                        payload: { type: 'object', description: 'Carga de datos devuelta por la API' }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.js'],
};

const specs = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app) => {
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
};