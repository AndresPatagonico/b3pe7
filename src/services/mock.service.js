import { faker } from '@faker-js/faker';
import { MockRepository } from '../repositories/mock.repository.js';
import { ROLES, PRODUCT_STATUS, PRIORITIES, ORDER_STATUS } from '../utils/constants.js';
import { CustomError } from './errors/custom-error.js';
import { EErrors } from './errors/enums.error.js';

export class MockService {
    constructor() {
        this.mockRepository = new MockRepository();
    }

    validateQuantity(qty) {
        if (qty === undefined || qty === null || qty === '') {
            return 10;
        }
        const parsedQty = parseInt(qty);
        if (isNaN(parsedQty) || parsedQty <= 0) {
            CustomError.createError({
                errorEnum: EErrors.INVALID_PARAM_ERROR,
                cause: `El parámetro 'qty' recibido ('${qty}') no es válido. Debe ser un número mayor a 0.`,
                message: "La cantidad solicitada para la generación de datos es inválida."
            });
        }
        return parsedQty;
    }

    generateMockUsers(qty) {
        const validQty = this.validateQuantity(qty);
        const users = [];
        const rolesArray = Object.values(ROLES);

        for (let i = 0; i < validQty; i++) {
            users.push({
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                role: faker.helpers.arrayElement(rolesArray)
            });
        }
        return users;
    }

    generateMockProducts(qty) {
        const validQty = this.validateQuantity(qty);
        const products = [];
        const statusArray = Object.values(PRODUCT_STATUS);

        for (let i = 0; i < validQty; i++) {
            products.push({
                title: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
                stock: faker.number.int({ min: 0, max: 100 }),
                category: faker.commerce.department(),
                status: faker.helpers.arrayElement(statusArray)
            });
        }
        return products;
    }

    async seedDatabase(qty) {
        const validQty = this.validateQuantity(qty);
        try {
            const fakeUsers = this.generateMockUsers(validQty);
            const insertedUsers = await this.mockRepository.insertUsers(fakeUsers);
            
            const fakeProducts = this.generateMockProducts(validQty);
            const insertedProducts = await this.mockRepository.insertProducts(fakeProducts);
            
            const fakeOrders = [];
            const prioritiesArray = Object.values(PRIORITIES);
            const statusesArray = Object.values(ORDER_STATUS);

            for (let i = 0; i < validQty; i++) {
                const randomUser = faker.helpers.arrayElement(insertedUsers);
                const randomProduct = faker.helpers.arrayElement(insertedProducts);

                fakeOrders.push({
                    user: randomUser._id,
                    products: [randomProduct._id],
                    total_price: randomProduct.price,
                    priority: faker.helpers.arrayElement(prioritiesArray),
                    status: faker.helpers.arrayElement(statusesArray)
                });
            }
            const insertedOrders = await this.mockRepository.insertOrders(fakeOrders);
            
            // Filtro estricto exigido por feedback: solo repartidores con rol DELIVERY
            const deliveryMen = insertedUsers.filter(u => u.role === ROLES.DELIVERY);
            
            const fakeDeliveries = [];

            for (let i = 0; i < insertedOrders.length; i++) {
                const randomOrder = insertedOrders[i];
                // Si por azar del mock no hay suficientes repartidores DELIVERY, usamos cualquiera o un respaldo
                const assignedDeliveryMan = deliveryMen.length > 0 
                    ? faker.helpers.arrayElement(deliveryMen) 
                    : faker.helpers.arrayElement(insertedUsers);

                fakeDeliveries.push({
                    order: randomOrder._id,
                    delivery_man: assignedDeliveryMan._id,
                    shipping_address: faker.location.streetAddress(),
                    status: 'ASSIGNED'
                });
            }
            const insertedDeliveries = await this.mockRepository.insertDeliveries(fakeDeliveries);

            return {
                message: "Seed completado con éxito",
                stats: {
                    users: insertedUsers.length,
                    products: insertedProducts.length,
                    orders: insertedOrders.length,
                    deliveries: insertedDeliveries.length
                }
            };
        } catch (error) {
            if (error.code === 400) throw error;

            CustomError.createError({
                errorEnum: EErrors.DATABASE_ERROR,
                cause: error.message,
                message: "Ocurrió un error crítico al intentar insertar los datos de prueba en la base de datos."
            });
        }
    }
}