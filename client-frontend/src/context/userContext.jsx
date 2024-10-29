import React, { createContext, useContext, useState } from 'react';

// Creamos un contexto para los usuarios
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // Inicializamos el estado del usuario como null y el estado de los posts como un array vacío
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]); 

    // Proporcionamos el contexto de usuario a los componentes hijos
    return (
        <UserContext.Provider value={{ user, setUser, posts, setPosts }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook para usar el contexto de usuario en otros componentes
export const useUser = () => useContext(UserContext);
