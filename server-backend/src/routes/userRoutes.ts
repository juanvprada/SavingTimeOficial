import express from 'express';
import { registerUser, loginUser, getAllUsers,  } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Rutas
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', authMiddleware, getAllUsers);

// Exporta el router
export default router;


