import express from 'express';
import LikeModel from '../models/likeModel';
import { CustomRequest, authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Ruta para dar like a un post
router.post('/:postId/like', authMiddleware, async (req: CustomRequest, res) => {
    const userId = req.user?.userId;
    const postId = req.params.postId;

    // Verificación de autenticación y validez de `postId`
    if (!userId) {
        return res.status(401).json({ message: 'Usuario no autenticado.' });
    }
    // if (isNaN(postId)) {
    //     return res.status(400).json({ message: 'ID de post inválido.' });
    // }

    try {
        // Verificación de si el usuario ya ha dado like
        const hasLiked = await LikeModel.userHasLiked(postId, userId);
        if (hasLiked) {
            return res.status(400).json({ message: 'Ya has dado like a este post.' });
        }

        // Intento de agregar el like
        await LikeModel.addLike(postId, userId);
        res.status(201).json({ message: 'Like agregado exitosamente.', postId, userId });
    } catch (error) {
        console.error('Error al agregar el like:', error);
        res.status(500).json({ message: 'Error interno al intentar agregar el like.', error: (error as Error).message });
    }
});

// Ruta para eliminar un like de un post
router.delete('/:postId/like', authMiddleware, async (req: CustomRequest, res) => {
    const userId = req.user?.userId;
    const postId = req.params.postId;

    if (!userId) {
        return res.status(401).json({ message: 'Usuario no autenticado.' });
    }
   

    try {
        const hasLiked = await LikeModel.userHasLiked(postId, userId);
        if (!hasLiked) {
            return res.status(404).json({ message: 'Like no encontrado.' });
        }

        await LikeModel.removeLike(postId, userId);
        res.status(200).json({ message: 'Like eliminado exitosamente.', postId, userId });
    } catch (error) {
        console.error('Error al eliminar el like:', error);
        res.status(500).json({ message: 'Error interno al intentar eliminar el like.', error: (error as Error).message });
    }
});

// Ruta para obtener el conteo de likes de un post
router.get('/:postId/likes', async (req, res) => {
    const postId: string = req.params.postId;


    try {
        const count = await LikeModel.getLikesByPost(postId);
        res.status(200).json({ count });
    } catch (error) {
        console.error('Error al obtener el conteo de likes:', error);
        res.status(500).json({ message: 'Error interno al intentar obtener los likes.', error: (error as Error).message });
    }
});

export default router;




