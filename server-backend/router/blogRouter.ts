import { Router } from 'express';
import { deletePost, getAllPosts, createPost, putPost } from '../controllers/controller';

export const router = Router();

router.get('/', getAllPosts);
router.post('/', createPost);
router.delete('/:id', deletePost);
router.put('/:id', putPost);

