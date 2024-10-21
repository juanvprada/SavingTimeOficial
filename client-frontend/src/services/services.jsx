const API_URL = ''; 

// ===========================
// Crear un nuevo Post
// ===========================
export const createPost = async (newPost) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost), // Corregido 'nePost' a 'newPost'
        });
        return response; 
    } catch (error) {
        console.error("Error al crear Post:", error);
        throw error; 
    }
};

// =====================
// Traer todos los Posts
// =====================
export const getPosts = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Error al obtener los Posts');
        }
        const posts = await response.json();
        return posts; 
    } catch (error) {
        console.error("Error al obtener Posts:", error);
        throw error; 
    }
};

// ====================
// Traer un solo Post
// ====================
export const getOnePost = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`); // Usamos el id para obtener el post específico
        if (!response.ok) {
            throw new Error('Error al obtener el Post');
        }
        const post = await response.json();
        return post;
    } catch (error) {
        console.error("Error al obtener el Post:", error);
        throw error;
    }
};

// ==================
// Actualizar un Post
// ==================
export const updatePost = async (id, updatedPost) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPost),
        });
        return response;
    } catch (error) {
        console.error("Error al actualizar Post:", error);
        throw error;
    }
};

// ================
// Eliminar un Post
// ================
export const deletePost = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        return response;
    } catch (error) {
        console.error("Error al eliminar Post:", error);
        throw error;
    }
};

