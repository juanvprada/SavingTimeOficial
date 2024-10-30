import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Definimos una interfaz para el objeto de usuario verificado
interface UserPayload {
    userId: number;
    role: string;
}

// Extendemos la interfaz Request para incluir el campo user
export interface CustomRequest extends Request {
    user?: UserPayload;
}

// Creamos el middleware de autenticación
export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    // Obtenemos el token del encabezado de autorización
    const token = req.headers['authorization']?.split(' ')[1];

    console.log('Token recibido:', token);

    // Validamos si el token está presente
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
        // Verificamos el token y obtenemos el payload del usuario
        const verified = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;
        // Asignamos el usuario verificado al request
        req.user = verified;
        console.log('Usuario verificado:', req.user);
        // Llamamos al siguiente middleware
        next();
    } catch (error) {
        console.error('Error al verificar el token:', error);
        return res.status(401).json({ message: 'Token no válido.' });
    }
};





