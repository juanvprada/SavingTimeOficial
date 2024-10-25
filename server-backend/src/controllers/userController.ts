import { Request, Response } from 'express';
import { db } from '../database/db';
import bcrypt from 'bcryptjs';  
import { OkPacket, RowDataPacket } from 'mysql2';   

// Registro de usuario
export const registerUser = async (req: Request, res: Response) => {
    const { email, password, name } = req.body; // Añadir name

    try {
        // Verificar si el usuario ya existe
        const [rows] = await db.query<RowDataPacket[]>(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (rows.length > 0) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const [result] = await db.query<OkPacket>(
            'INSERT INTO users (email, password, name) VALUES (?, ?, ?)', // Añadir name aquí
            [email, hashedPassword, name]
        );

        res.status(201).json({
            message: 'Usuario registrado con éxito',
            userId: result.insertId,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};

// Iniciar sesión
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const [rows] = await db.query<RowDataPacket[]>(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const user = rows[0]; 
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        res.json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

