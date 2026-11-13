import { UserModel } from '../models/user.model.js';

export class UserRepository {
    async findAll() {
        return await UserModel.find().lean();
    }

    async findByEmail(email) {
        return await UserModel.findOne({ email }).lean();
    }

    async create(userData) {
        return await UserModel.create(userData);
    }
}