import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Definir una interfaz para el objeto de usuario verificado
interface UserPayload {
    userId: string; 
    role: string;
}

// Extender la interfaz Request para incluir el campo user
interface CustomRequest extends Request {
    user?: UserPayload; 
}

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
        const verified = jwt.verify(token, '1234') as UserPayload; 
        req.user = verified; 
        next(); 
    } catch (error) {
        return res.status(401).json({ message: 'Token no válido.' });
    }
};


