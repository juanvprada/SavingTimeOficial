import express from 'express';
import { getPosts, createPost, deletePost, getPostById, updatePost } from '../controllers/postController';

const router = express.Router();

// Rutas
router.get('/', getPosts); 
router.get('/:id', getPostById); 
router.post('/', createPost); 
router.put('/:id', updatePost); 
router.delete('/:id', deletePost); 

// Exporta el router
export default router;



