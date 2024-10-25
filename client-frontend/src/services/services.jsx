import axios from 'axios';


const API_URL = 'http://localhost:5000/api/posts';

// Crear un nuevo Post
export const createPost = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData);
    
    response.data.image = `http://localhost:5000/uploads/${response.data.image}`;
    return response.data; 
  } catch (error) {
    console.error("Error al crear Post:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Traer todos los Posts
export const getPosts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener Posts:", error);
    throw error;
  }
};

// Traer un solo Post
export const getOnePost = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el Post:", error);
    throw error;
  }
};

// Actualizar un Post
export const updatePost = async (id, postData) => {
  try {
      const response = await axios.put(`http://localhost:5000/api/posts/${id}`, postData);
      return response.data;
  } catch (error) {
      console.error('Error al actualizar Post: ', error.response.data);
      throw error;
  }
};
// EditPost.jsx
const handleUpdate = async (updatedPost) => {
  const updatedPostObject = {
    name: updatedPost.get('name'),
    kindOfPost: updatedPost.get('kindOfPost'),
    description: updatedPost.get('description'),
  };

  if (updatedPost.has('image')) {
    updatedPostObject.image = updatedPost.get('image');
  }

  try {
    await updatePost(id, updatedPostObject);
    navigate('/blog'); 
  } catch (error) {
    console.error("Error al actualizar el Post:", error);
  }
};

// Eliminar un Post
export const deletePost = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response;
  } catch (error) {
    console.error("Error al eliminar Post:", error);
    throw error;
  }
};
