import { Request, Response } from 'express';
import { db } from '../database/db';
import { v4 as uuidv4 } from 'uuid';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export const createPost = async (req: Request, res: Response) => {
    const { name, kindOfPost, description, image } = req.body;

    // Validar los campos
    if (!name || !kindOfPost || !description || !image) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const id = uuidv4(); 

    try {
        const [result] = await db.query<ResultSetHeader>(
            'INSERT INTO posts (id, name, kindOfPost, description, image) VALUES (?, ?, ?, ?, ?)',
            [id, name, kindOfPost, description, image]
        );
        
        res.status(201).json({
            message: 'Post creado con éxito',
            post: {
                id,
                name,
                kindOfPost,
                description,
                image
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el post' });
    }
};

export const getPostById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const [rows] = await db.query<RowDataPacket[]>(
            'SELECT * FROM posts WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el post' });
    }
};

export const updatePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, kindOfPost, description, image } = req.body;

    // Validar los campos
    if (!name || !kindOfPost || !description || !image) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const [result] = await db.query<ResultSetHeader>(
            'UPDATE posts SET name = ?, kindOfPost = ?, description = ?, image = ? WHERE id = ?',
            [name, kindOfPost, description, image, id]
        );

        // Verificamos el resultado
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        res.json({ message: 'Post actualizado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el post' });
    }
};

export const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const [result] = await db.query<ResultSetHeader>(
            'DELETE FROM posts WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        res.json({ message: 'Post eliminado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el post' });
    }
};

export const getPosts = async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query('SELECT * FROM posts');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener posts' });
    }
};



