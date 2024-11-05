import { CustomRequest } from '../middleware/authMiddleware';
import { Response } from 'express';
import LikeModel from '../models/likeModel';

export const toggleLike = async (req: CustomRequest, res: Response) => {
    const postId = req.params.postId;
    const userId = req.user?.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Usuario no autenticado.' });
    }

    try {
        const hasLiked = await LikeModel.userHasLiked(postId, userId);

        if (hasLiked) {
            await LikeModel.removeLike(postId, userId);
            return res.status(200).json({ message: 'Like eliminado exitosamente.', liked: false });
        } else {
            await LikeModel.addLike(postId, userId);
            return res.status(201).json({ message: 'Like agregado exitosamente.', liked: true });
        }
    } catch (error: unknown) {
        console.error('Error al manejar el like:', error);
        res.status(500).json({ message: (error instanceof Error ? error.message : 'Error al manejar el like.') });
    }
};
