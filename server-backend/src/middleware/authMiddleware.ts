import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Definimos una interfaz para el objeto de usuario verificado
interface UserPayload {
    userId: number;
    role: string;
}
export interface CustomRequest extends Request {
    user?: UserPayload;
}

//=======================================
// Creamos el middleware de autenticación
//=======================================
export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    console.log('Token recibido:', token);

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;
        req.user = verified;
        console.log('Usuario verificado:', req.user);
        next();
    } catch (error) {
        console.error('Error al verificar el token:', error);
        return res.status(401).json({ message: 'Token no válido.' });
    }
};





