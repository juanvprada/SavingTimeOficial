import { Request, Response } from 'express';
import { db } from '../database/db';
import { v4 as uuidv4 } from 'uuid';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// Creamos un nuevo post
export const createPost = async (req: Request, res: Response) => {
    const { name, kindOfPost, description } = req.body;

    // Normalizamos la ruta de la imagen
    const imagePath = req.file?.path ? req.file.path.replace(/\\/g, '/') : '';
    const imageName = imagePath.split('/').pop();
    const image = imageName ? `http://localhost:5000/uploads/${imageName}` : '';

    // Validamos los campos
    if (!name || !kindOfPost || !description || !image) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const id = uuidv4(); 

    try {
        // Insertamos el nuevo post en la base de datos
        const [result] = await db.query<ResultSetHeader>(
            'INSERT INTO posts (id, name, kindOfPost, description, image) VALUES (?, ?, ?, ?, ?)',
            [id, name, kindOfPost, description, image]
        );

        // Respuesta exitosa y creación de nuevo post
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

// Obtenemos un post por su ID
export const getPostById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Consultamos la base de datos para obtener el post
        const [rows] = await db.query<RowDataPacket[]>(
            'SELECT * FROM posts WHERE id = ?',
            [id]
        );

        // Validamos si encontramos el post
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        // Respuesta con el post encontrado
        res.json(rows[0]);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Error al obtener el post' }); 
    }
};

// Actualizamos un post existente
export const updatePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, kindOfPost, description } = req.body;

    // Verificamos si hay un archivo nuevo
    const image = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : undefined;

    // Si no hay una nueva imagen, buscamos la imagen existente en la base de datos
    let existingImage: string | undefined;

    try {
        const [rows] = await db.query<RowDataPacket[]>('SELECT image FROM posts WHERE id = ?', [id]);

        // Si el post no existe, devolvemos un error
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        // Obtenemos la imagen existente
        existingImage = rows[0].image;

    } catch (error) {
        console.error(error); 
        return res.status(500).json({ message: 'Error al obtener la imagen existente' });
    }

    // Si no hay imagen nueva, utilizamos la existente
    const finalImage = image || existingImage;

    // Validamos los campos
    if (!name || !kindOfPost || !description || !finalImage) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Actualizamos el post en la base de datos
        const [result] = await db.query<ResultSetHeader>(
            'UPDATE posts SET name = ?, kindOfPost = ?, description = ?, image = ? WHERE id = ?',
            [name, kindOfPost, description, finalImage, id]
        );

        // Validamos si se actualizó el post
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        // Respuesta exitosa y el post se actualiza
        res.json({ message: 'Post actualizado con éxito', post: { id, name, kindOfPost, description, image: finalImage } });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Error al actualizar el post' });
    }
};

// Eliminamos un post existente
export const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Eliminamos el post de la base de datos
        const [result] = await db.query<ResultSetHeader>(
            'DELETE FROM posts WHERE id = ?',
            [id]
        );

        // Validamos si el post fue encontrado y eliminado
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        // Respuesta exitosa
        res.json({ message: 'Post eliminado con éxito' });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Error al eliminar el post' }); 
    }
};

// Obtenemos todos los posts
export const getPosts = async (req: Request, res: Response) => {
    try {
        // Consultamos la base de datos para obtener todos los posts
        const [rows] = await db.query('SELECT * FROM posts');
        // Respuesta, la lista de posts
        res.json(rows);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Error al obtener posts' }); 
    }
};




