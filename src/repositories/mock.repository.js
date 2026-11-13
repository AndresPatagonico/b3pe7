import { UserModel } from '../models/user.model.js';
import { ProductModel } from '../models/product.model.js';
import { OrderModel } from '../models/order.model.js';
import { DeliveryModel } from '../models/delivery.model.js';

export class MockRepository {
    async insertUsers(users) {
        return await UserModel.insertMany(users);
    }

    async insertProducts(products) {
        return await ProductModel.insertMany(products);
    }

    async insertOrders(orders) {
        return await OrderModel.insertMany(orders);
    }

    async insertDeliveries(deliveries) {
        return await DeliveryModel.insertMany(deliveries);
    }

    async getAllUsers() {
        return await UserModel.find().lean();
    }

    async getAllProducts() {
        return await ProductModel.find().lean();
    }
}