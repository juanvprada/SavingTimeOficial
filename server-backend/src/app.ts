import express from 'express'; // Asegúrate de usar la sintaxis de importación ES6
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes'; // Asegúrate de que la ruta sea correcta
import postRoutes from './routes/postRoutes'; // Asegúrate de que la ruta sea correcta

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes); 
app.use('/api/posts', postRoutes); 

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});





