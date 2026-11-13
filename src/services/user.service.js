import { UserRepository } from '../repositories/user.repository.js';

export class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async getUsers() {
        return await this.userRepository.findAll();
    }

    async createUser(userData) {
        const existingUser = await this.userRepository.findByEmail(userData.email);
            if (existingUser) {
            throw new Error('El correo electrónico ya se encuentra registrado');
        }
        
        return await this.userRepository.create(userData);
    }
}