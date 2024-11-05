import { db } from '../database/db';

// Creamos la clase LikeModel para interactuar con la base de datos
class LikeModel {

    //=========================================
    // Definimos el método para agregar un like
    //=========================================
    static async addLike(postId: string, userId: number): Promise<void> {
        const query = 'INSERT INTO likes (postId, userId) VALUES (?, ?)';
        try {
            await db.execute(query, [postId, userId]);
        } catch (error) {
            console.error('Error al agregar like:', error);
            throw new Error('Error al agregar el like.');
        }
    }

    //============================================================
    // Definimos el método para obtener todos los likes de un post
    //============================================================
    static async getLikesByPost(postId: string): Promise<number> {
        const query = 'SELECT COUNT(*) AS count FROM likes WHERE postId = ?';
        try {
            const [rows] = await db.execute(query, [postId]);
            return (rows as any)[0].count;
        } catch (error) {
            console.error('Error al obtener likes por post:', error);
            throw new Error('Error al obtener likes por post.');
        }
    }

    //===========================================================================
    // Definimos el método para verificar si un usuario ya ha dado like a un post
    //===========================================================================
    static async userHasLiked(postId: string, userId: number): Promise<boolean> {
        const query = 'SELECT COUNT(*) AS count FROM likes WHERE postId = ? AND userId = ?';
        try {
            const [rows] = await db.execute(query, [postId, userId]);
            return (rows as any)[0].count > 0;
        } catch (error) {
            console.error('Error al verificar like:', error);
            throw new Error('Error al verificar like.');
        }
    }

    //==========================================
    // Definimos el método para eliminar un like
    //==========================================
    static async removeLike(postId: string, userId: number): Promise<void> {
        const query = 'DELETE FROM likes WHERE postId = ? AND userId = ?';
        try {
            await db.execute(query, [postId, userId]);
        } catch (error) {
            console.error('Error al eliminar like:', error);
            throw new Error('Error al eliminar el like.');
        }
    }
}

export default LikeModel;


