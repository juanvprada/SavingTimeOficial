import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes'; 
import postRoutes from './routes/postRoutes'; 
import roleRoutes from './routes/roleRoutes';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde el directorio "uploads" 
const uploadPath = path.join(__dirname, 'uploads'); 
console.log('Upload path:', uploadPath); 
app.use('/uploads', express.static(uploadPath)); 
import likeRoutes from './routes/likeRoutes';

// Rutas
app.use('/api/auth', authRoutes); 
app.use('/api/users', userRoutes); 
app.use('/api/posts', postRoutes); 
app.use('/api/roles', roleRoutes); 
app.use('/api/likes', likeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});







