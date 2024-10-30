import express, { Request, Response } from 'express';
import { loginUser } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Ruta para el inicio de sesión
router.post('/acceso', loginUser);

// Ruta protegida para el perfil
router.get('/perfil', authMiddleware, (req: Request & { user?: { userId: number; role: string } }, res: Response) => {
    const userId = req.user?.userId;
    const role = req.user?.role;

    // Buscamos al usuario en la base de datos para devolver su información
    res.json({
        message: 'Perfil de usuario',
        userId,
        role,
    });
});

export default router;



