import { Request, Response } from 'express';
import { db } from '../database/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OkPacket, RowDataPacket } from 'mysql2';

// Registro de usuario
export const registerUser = async (req: Request, res: Response) => {
    const { email, password, name, role = 'user' } = req.body;

    try {
        // Verificamos si el usuario ya existe en la base de datos
        const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Hasheamos la contraseña para almacenarla de forma segura
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query<OkPacket>(
            'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)',
            [email, hashedPassword, name, role]
        );

        // Generamos un token al registrar el usuario
        const token = jwt.sign(
            { userId: result.insertId, role, email, name },
            '1234',
            { expiresIn: '1h' }
        );

        // Devolvemos una respuesta con el mensaje y el token generado
        res.status(201).json({
            message: 'Usuario registrado con éxito',
            userId: result.insertId,
            token: token,
            role: role
        });
    } catch (error) {
        console.error(error);
        // Manejamos cualquier error que ocurra durante el registro
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};


// Iniciar sesión
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Buscamos el usuario en la base de datos por su correo electrónico
        const [rows] = await db.query<RowDataPacket[]>(
            'SELECT id, email, password, name, role FROM users WHERE email = ?',
            [email]
        );

        // Verificamos si se encontró el usuario
        if (rows.length === 0) {
            console.log('No se encontró el usuario con el correo:', email);
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const user = rows[0];
        console.log('Usuario encontrado:', user);

        // Comparamos la contraseña ingresada con la almacenada
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('¿La contraseña coincide?', isMatch);

        // Si la contraseña no coincide, devolvemos un error
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Generamos un token para el usuario autenticado
        const token = jwt.sign(
            { userId: user.id, role: user.role, email: user.email, name: user.name },
            '1234',
            { expiresIn: '1h' }
        );

        // Devolvemos la respuesta con el token y el rol del usuario
        res.json({
            message: 'Inicio de sesión exitoso',
            role: user.role,
            name: user.name,
            token: token,
        });
    } catch (error) {
        console.error('Error en el proceso de login:', error);
        // Manejamos cualquier error que ocurra durante el inicio de sesión
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

// Obtener todos los usuarios
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        // Consultamos todos los usuarios en la base de datos
        const [rows] = await db.query<RowDataPacket[]>('SELECT id, email, role FROM users');
        res.json(rows);
    } catch (error) {
        console.error(error);
        // Manejamos cualquier error que ocurra al obtener la lista de usuarios
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
};





