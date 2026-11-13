import { ProductService } from '../services/product.service.js';

const productService = new ProductService();

export class ProductController {
    static async getProducts(req, res, next) {
        try {
            const products = await productService.getProducts();
            return res.status(200).json({ status: 'success', payload: products });
        } catch (error) {
            next(error);
        }
    }

    static async createProduct(req, res, next) {
        try {
            const newProduct = await productService.createProduct(req.body);
            return res.status(201).json({ status: 'success', payload: newProduct });
        } catch (error) {
            next(error);
        }
    }
}