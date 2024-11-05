import { Request, Response } from 'express';
import PostBlog from '../model/blogModel'

//CRUD
//READ - GET

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const post = await PostBlog.findAll(); // aqui cambia el metodo mongo
    res.json(post);
  } catch (error) {
    res.json({ message: "Ha ocurrido un error", error });
  }
};


//obtener meme POR ID

//CREATE - POST
export const createPost = async (req: Request, res: Response) => {
  try {
    const { name, description, category, image, date, likes } = req.body;
    const post = await PostBlog.create({
      name,
      description,
      category,
      image,
      date,
      likes,
    });
    res.json(post);
  } catch (error) {
    res.json({ message: "Ha ocurrido un error", error });
  }
};

//DELETE - DELETE

export const deletePost = async (req: Request, res: Response) => {
  
  try {
    const postId = req.params.id;
    const post = await PostBlog.findByPk(postId)

    if (!post) {
      return res.status(404).json({ message: 'El meme no existe' });
    }
    
    await post?.destroy();
    res.json(post);
    
  } catch (error) {
    console.log('El meme no se pudo eliminar', error);
  }
};

//UPDATE - PUT

export const putPost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const { name, description, category, image, date, likes } = req.body;
    const post = await PostBlog.findByPk(postId);
    await post?.update({
      name,
      description,
      category,
      image,
      date,
      likes,
    });
    res.json(post);
  } catch (error) {
    console.log('El meme no se pudo actualizar', error);
  }
}