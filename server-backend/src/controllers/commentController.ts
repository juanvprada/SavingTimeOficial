import { Request, Response } from 'express';
import Comment from '../models/commentModel';
import { CustomRequest } from '../middleware/authMiddleware';
import { validate as isValidUUID } from 'uuid';

//=====================
// Crear un comentario
//=====================
export const createComment = async (req: CustomRequest, res: Response) => {
  try {
    const { postId } = req.params;
    const userId = req.user?.userId;
    const { content } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    const newComment = await Comment.create({ userId, postId, content });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Error creando comentario', error });
  }
};

//===============================
// Obtener comentarios por postId
//===============================
export const getCommentsByPostId = async (req: CustomRequest, res: Response) => {
  try {
    const { postId } = req.params;

    if (!isValidUUID(postId)) {
      return res.status(400).json({ message: 'Post ID inválido' });
    }

    const comments = await Comment.findAll({ where: { postId }, order: [['created_at', 'DESC']] });

    if (comments.length === 0) {
      return res.status(404).json({ message: 'No se encontraron comentarios para este post' });
    }

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo comentarios', error });
  }
};
