import express from 'express';
import { createComment, getCommentsByPostId } from '../controllers/commentController';
import { authMiddleware } from '../middleware/authMiddleware'; 

const router = express.Router();

// Ruta para obtener los comentarios de un post
router.get('/:postId', getCommentsByPostId);

// Ruta para crear un comentario (requiere autenticación)
router.post('/:postId/comments', authMiddleware, createComment);

export default router;