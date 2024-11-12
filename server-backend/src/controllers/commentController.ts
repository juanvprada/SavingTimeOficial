import { Request, Response } from 'express';
import { CommentModel } from '../models/commentModel';
import { CustomRequest } from '../middleware/authMiddleware';
import { validate as isValidUUID } from 'uuid';

// Crear un comentario
export const createComment = async (req: CustomRequest, res: Response) => {
  try {
    const postId = req.params.postId;
    const userId = req.user?.userId;

    // Verificamos que userId esté presente (esto se hace por si el middleware no lo asignó correctamente)
    if (!userId) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    const { content } = req.body;

    // Llamamos al modelo para crear el comentario
    const newComment = await CommentModel.create({ userId, postId, content });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Error creando comentario', error });
  }
};

// Obtener comentarios por postId
export const getCommentsByPostId = async (req: CustomRequest, res: Response) => {
    try {
      const postId = req.params.postId;
      
      console.log(`Obteniendo comentarios para el postId: ${postId}`);
      
      // Validar que el postId sea un UUID
      if (!isValidUUID(postId)) {
        console.log(`Post ID inválido: ${postId}`);
        return res.status(400).json({ message: 'Post ID inválido' });
      }
  
      // Buscar comentarios por postId
      const comments = await CommentModel.findByPostId(postId);
      
      console.log(`Comentarios encontrados para postId ${postId}: ${comments.length}`); 
  
      // Verificar si no hay comentarios
      if (comments.length === 0) {
        return res.status(404).json({ message: 'No se encontraron comentarios para este post' });
      }
  
      res.status(200).json(comments);
    } catch (error) {
      console.error('Error obteniendo comentarios:', error);
      res.status(500).json({ message: 'Error obteniendo comentarios', error });
    }
  };