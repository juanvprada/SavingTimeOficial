import express from 'express';
import { registerUser, loginUser, getAllUsers,  } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', authMiddleware, getAllUsers);

export default router;
