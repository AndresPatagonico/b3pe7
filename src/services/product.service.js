import { ProductRepository } from '../repositories/product.repository.js';
import { PRODUCT_STATUS } from '../utils/constants.js';

export class ProductService {
    constructor() {
    this.productRepository = new ProductRepository();
    }

    async getProducts() {
    return await this.productRepository.findAll();
    }

    async getProductById(id) {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new Error('El producto no existe');
        }
        return product;
    }

    async createProduct(productData) {
        if (productData.stock === 0) {
            productData.status = PRODUCT_STATUS.OUT_OF_STOCK;
        }
    
        return await this.productRepository.create(productData);
    }
}