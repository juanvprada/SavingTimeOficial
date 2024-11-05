import conectionDB from './database/conectionDb'; // Import database connection
import PostBlog from './model/blogModel';  // Import model from table Meme
import express from 'express';
import cors from 'cors';
import { router } from './router/blogRouter';
import {PORT} from './config';
import UserModel from './model/userModel';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // el localhost donde esta corriendo el front
}));
app.use(express.json());

app.use('/api/posts', router);

  const initializeDatabase = async () => {
    try {
      await conectionDB.authenticate();  // Autheticas the database
      console.log('Conexión a la base de datos exitosa');
  
      // Fetch all memes
      await PostBlog.sync({ force: true });
      console.log('Tabla de memes creada');
  
      await UserModel.sync({ force: false });
      console.log('Tabla de usuarios creada');
  
    } catch (error) {
      console.error('Error al conectar o consultar la base de datos 😒:', error);
    }
  };
  
  initializeDatabase();


export const server = app.listen((PORT || 3000), () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}/`);;
});

export default app;

