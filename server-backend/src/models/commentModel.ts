import { db } from '../database/db';
import { CommentInterface } from '../interfaces/commentInterface';
import mysql2 from 'mysql2/promise';

export const CommentModel = {
  create: async (data: { userId: number, postId: string, content: string }): Promise<CommentInterface | null> => {
    // Usamos un UUID (postId) como una cadena
    const [result] = await db.query<mysql2.OkPacket>(
      'INSERT INTO comments (userId, postId, content) VALUES (?, ?, ?)',
      [data.userId, data.postId, data.content]
    );

    // Obtener el id del comentario recién creado y agregar created_at
    const [comment] = await db.query<mysql2.RowDataPacket[]>(
      'SELECT id, userId, postId, content, created_at FROM comments WHERE id = ?',
      [result.insertId]
    );

    // Verificar si el comentario existe y devolverlo, de lo contrario retornar null
    return comment.length > 0 ? comment[0] as CommentInterface : null;
  },

  // Obtener los comentarios por postId (ahora es un UUID)
  findByPostId: async (postId: string): Promise<CommentInterface[]> => {
    try {
      console.log(`Consultando comentarios para postId: ${postId}`);  // Log de debug

      const [comments] = await db.query<mysql2.RowDataPacket[]>(
        'SELECT c.id, c.userId, c.postId, c.content, c.created_at, u.username ' +
        'FROM comments c JOIN users u ON c.userId = u.id WHERE c.postId = ? ' +
        'ORDER BY c.created_at DESC',
        [postId] // Asegúrate de que postId esté siendo pasado como una cadena
      );

      console.log(`Comentarios encontrados: ${comments.length}`);  // Log de la cantidad de comentarios

      // Mapeamos los resultados para asegurarnos de que se devuelvan en el formato correcto
      return comments.map((comment: any) => {
        return {
          id: comment.id,
          postId: comment.postId,
          userId: comment.userId,
          content: comment.content,
          created_at: comment.created_at,
          username: comment.username || '',  // Aseguramos que `username` siempre esté presente
        } as CommentInterface;
      });
    } catch (error) {
      console.error('Error en la consulta de comentarios:', error);
      throw error; // Lanza el error para que el controlador lo maneje
    }
  },
};
