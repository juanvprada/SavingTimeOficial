import axios from 'axios';

// Definimos la URL base para la API de likes
const API_URL = 'http://localhost:5000/api/likes';

// Función para agregar un like a un post
export const addLike = async (postId) => {
  try {
    // Obtenemos el token de autenticación del almacenamiento local
    const token = localStorage.getItem('token');

    // Realizamos la solicitud POST para agregar un like
    const response = await axios.post(`${API_URL}/${postId}/like`, {}, {
      headers: {
        // Incluimos el token en los encabezados de autorización
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Retornamos la respuesta de la API
    return response.data;
  } catch (error) {
    // Manejamos errores: si hay una respuesta del servidor
    if (error.response) {
      console.error('Error al agregar like:', error.response.data);
    } else {

      console.error('Error desconocido:', error.message);
    }
    // Lanzamos el error para manejarlo en la llamada
    throw error;
  }
};

// Función para eliminar un like de un post
export const removeLike = async (postId) => {
  try {
    // Obtenemos el token de autenticación del almacenamiento local
    const token = localStorage.getItem('token');

    // Realizamos la solicitud DELETE para eliminar un like
    const response = await axios.delete(`${API_URL}/${postId}/like`, {
      headers: {
        // Incluimos el token en los encabezados de autorización
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });

    // Retornamos la respuesta de la API
    return response.data;
  } catch (error) {
    // Manejamos errores: si hay una respuesta del servidor
    if (error.response) {
      console.error('Error al eliminar like:', error.response.data);
    } else {
      // Si hay un error desconocido
      console.error('Error desconocido:', error.message);
    }
    // Lanzamos el error para manejarlo en la llamada
    throw error;
  }
};



