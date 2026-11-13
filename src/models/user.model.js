import mongoose from 'mongoose';
import { ROLES } from '../utils/constants.js';

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        required: true, 
        default: ROLES.USER,
        enum: Object.values(ROLES) 
    },
    documents: [
        {
            name: { type: String, required: true },       // Nombre generado
            originalName: { type: String, required: true },
            docType: { type: String, required: true },    // Ej: DNI, Licencia, Comprobante
            reference: { type: String, required: true },  // Ruta relativa
            mimeType: { type: String, required: true },
            size: { type: Number, required: true },
            uploadedAt: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true });

export const UserModel = mongoose.model('users', userSchema);