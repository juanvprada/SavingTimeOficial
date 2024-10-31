import { create } from 'zustand';

// Definimos nuestra tienda Zustand
const useStore = create((set) => ({
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null,
    username: localStorage.getItem('name') || null, // Añadido para el nombre de usuario
    likes: {},
    setToken: (token) => {
        localStorage.setItem('token', token);
        set({ token });
    },
    setRole: (role) => {
        localStorage.setItem('role', role);
        set({ role });
    },
    setUsername: (username) => {
        localStorage.setItem('name', username); // Almacena el nombre en localStorage
        set({ username }); // Actualiza el nombre de usuario en Zustand
    },
    addLike: (postId) => set((state) => ({
        likes: { ...state.likes, [postId]: (state.likes[postId] || 0) + 1 },
    })),
    removeLike: (postId) => set((state) => {
        const newLikes = { ...state.likes };
        if (newLikes[postId]) newLikes[postId] -= 1;
        return { likes: newLikes };
    }),
}));

export default useStore;












