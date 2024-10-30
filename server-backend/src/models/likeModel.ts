import { db } from '../database/db';

// Creamos la clase LikeModel para interactuar con la base de datos
class LikeModel {
    // Definimos el método para agregar un like
    static async addLike(postId: string, userId: number): Promise<void> {
        const query = 'INSERT INTO likes (postId, userId) VALUES (?, ?)';
        await db.execute(query, [postId, userId]);
    }

    // Definimos el método para obtener todos los likes de un post
    static async getLikesByPost(postId: any): Promise<number> {
        const query = 'SELECT COUNT(*) AS count FROM likes WHERE postId = ?';
        const [rows] = await db.execute(query, [postId]);
        return (rows as any)[0].count;
    }

    // Definimos el método para verificar si un usuario ya ha dado like a un post
    static async userHasLiked(postId: any, userId: number): Promise<boolean> {
        const query = 'SELECT COUNT(*) AS count FROM likes WHERE postId = ? AND userId = ?';
        const [rows] = await db.execute(query, [postId, userId]);
        return (rows as any)[0].count > 0;
    }

    // Definimos el método para eliminar un like
    static async removeLike(postId: any, userId: number): Promise<void> {
        const query = 'DELETE FROM likes WHERE postId = ? AND userId = ?';
        await db.execute(query, [postId, userId]);
    }
}

export default LikeModel;

