import { Request, Response } from 'express';
import { createComment, getCommentsByPostId } from '../controllers/commentController';
import Comment from '../models/commentModel';

jest.mock('../models/commentModel');

describe('Comment Controller', () => {
  describe('createComment', () => {
    it('debería crear un comentario', async () => {
      const req = {
        params: { postId: '123e4567-e89b-12d3-a456-426614174000' },
        user: { userId: '456' },
        body: { content: 'Este es un comentario' }
      } as unknown as Request;

      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      (Comment.create as jest.Mock).mockResolvedValue({
        id: 1,
        userId: '456',
        postId: '123e4567-e89b-12d3-a456-426614174000',
        content: 'Este es un comentario',
        created_at: new Date()
      });

      await createComment(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ content: 'Este es un comentario' }));
    });
  });

  describe('getCommentsByPostId', () => {
    it('debería obtener los comentarios de un post', async () => {
      const req = { params: { postId: '123e4567-e89b-12d3-a456-426614174000' } } as unknown as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      (Comment.findAll as jest.Mock).mockResolvedValue([{ id: 1, content: 'Comentario 1' }]);

      await getCommentsByPostId(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    });
  });
});

