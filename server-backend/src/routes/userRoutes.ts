import express from 'express';
import { registerUser, loginUser } from '../controllers/userController';

const router = express.Router();

// Rutas
router.post('/register', registerUser);
router.post('/login', loginUser);

// Exporta el router
export default router;


