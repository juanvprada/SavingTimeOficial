// routes/roleRoutes.ts
import express from 'express';
import { updateUserRole } from '../controllers/roleController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Ruta para actualizar el rol de un usuario
router.patch('/:id/role', authMiddleware, updateUserRole);

// Exporta el router
export default router;
