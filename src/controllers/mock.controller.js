import { MockService } from '../services/mock.service.js';

const mockService = new MockService();

export class MockController {
    static getMockUsers(req, res, next) {
        try {
            const qty = req.query.qty;
            const users = mockService.generateMockUsers(qty);
            return res.status(200).json({ status: 'success', count: users.length, payload: users });
        } catch (error) {
            next(error);
        }
    }

    static getMockProducts(req, res, next) {
        try {
            const qty = req.query.qty;
            const products = mockService.generateMockProducts(qty);
            return res.status(200).json({ status: 'success', count: products.length, payload: products });
        } catch (error) {
            next(error);
        }
    }

    static async seedData(req, res, next) {
        try {
            const qty = req.query.qty;
            const result = await mockService.seedDatabase(qty);
            return res.status(201).json({ status: 'success', payload: result });
        } catch (error) {
            next(error);
        }
    }
}