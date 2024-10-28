// controllers/roleController.ts
import { Request, Response } from 'express';
import { db } from '../database/db';

// Actualizar el rol de un usuario
export const updateUserRole = async (req: Request & { user?: { userId: string; role: string } }, res: Response) => {
    const user = req.user;

    // Verificar si el usuario es administrador
    if (user?.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado' });
    }

    const { id } = req.params;
    const { role } = req.body;

    try {
        await db.query('UPDATE users SET role = ? WHERE id = ?', [role, id]);
        res.json({ message: 'Rol de usuario actualizado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el rol del usuario' });
    }
};
