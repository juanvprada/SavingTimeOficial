import { CustomRequest } from '../middleware/authMiddleware';
import { Response } from 'express';
import { db } from '../database/db';
import { RowDataPacket } from 'mysql2';

// Agregamos like
export const addLike = async (req: CustomRequest, res: Response) => {
    console.log('postId en params:', req.params.postId);
    console.log('userId en req.user:', req.user?.userId);
    const postId = req.params.postId;
    const userId = req.user?.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Usuario no autenticado.' });
    }

    try {
        // Verificamos si ya existe un like para el post por parte del usuario
        const [existingLike] = await db.query<RowDataPacket[]>('SELECT * FROM likes WHERE postId = ? AND userId = ?', [postId, userId]);
        if (existingLike.length > 0) {
            return res.status(400).json({ message: 'Ya has dado like a este post.' });
        }

        // Agregamos el like a la base de datos
        const [result] = await db.query('INSERT INTO likes (postId, userId) VALUES (?, ?)', [postId, userId]);

        // Verificamos el resultado de la inserción
        if (result && 'insertId' in result) {
            res.status(201).json({ message: 'Like agregado exitosamente', likeId: result.insertId });
        } else {
            res.status(500).json({ message: 'Error al agregar el like' });
        }
    } catch (error) {
        console.error('Error al agregar like:', error);
        res.status(500).json({ message: 'Error al agregar el like' });
    }
};

// Eliminamos like
export const removeLike = async (req: CustomRequest, res: Response) => {
    const { postId } = req.body;
    const userId = req.user?.userId;

    // Verificamos si el usuario está autenticado
    if (!userId) {
        return res.status(401).json({ message: 'Usuario no autenticado.' });
    }

    try {
        // Eliminamos el like de la base de datos
        const [result] = await db.query('DELETE FROM likes WHERE postId = ? AND userId = ?', [postId, userId]);

        // Verificamos el resultado de la eliminación
        if (result && 'affectedRows' in result) {
            if (result.affectedRows > 0) {
                return res.json({ message: 'Like eliminado exitosamente' });
            } else {
                return res.status(404).json({ message: 'Like no encontrado.' });
            }
        } else {
            return res.status(500).json({ message: 'Error al eliminar el like' });
        }
    } catch (error) {
        console.error('Error al eliminar like:', error);
        res.status(500).json({ message: 'Error al eliminar el like' });
    }
};

