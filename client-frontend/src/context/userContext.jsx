import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]); 

    return (
        <UserContext.Provider value={{ user, setUser, posts, setPosts }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
