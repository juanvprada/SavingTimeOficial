import axios from 'axios';


const API_URL = 'http://localhost:5000/posts';

// Crear un nuevo Post
export const createPost = async (newPost) => {
  try {
    const response = await axios.post(API_URL, newPost, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error("Error al crear Post:", error);
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
export const updatePost = async (id, updatedPost) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedPost, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error("Error al actualizar Post:", error);
    throw error;
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
