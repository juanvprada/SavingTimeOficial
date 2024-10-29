import axios from 'axios';

const API_URL = 'http://localhost:5000/api/likes';

// Función para agregar un like a un post
export const addLike = async (postId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/${postId}/like`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json", 
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error al agregar like:', error.response.data); 
        } else {
            console.error('Error desconocido:', error.message);
        }
        throw error;
    }
};

// Función para eliminar un like de un post
export const removeLike = async (postId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${API_URL}/${postId}/like`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error al eliminar like:', error.response.data);
        } else {
            console.error('Error desconocido:', error.message);
        }
        throw error;
    }
};


