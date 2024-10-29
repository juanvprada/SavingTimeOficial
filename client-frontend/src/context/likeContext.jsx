import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchLikes, addLike, removeLike } from '../api/likesApi'; 

const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const loadLikes = async () => {
      try {
        const data = await fetchLikes(); 
        setLikes(data); 
      } catch (error) {
        console.error('Error al cargar likes:', error);
      }
    };
    loadLikes();
  }, []);

  const handleLike = async (postId) => {
    try {
      const newLike = await addLike(postId); 
      setLikes((prevLikes) => [...prevLikes, newLike]); 
    } catch (error) {
      console.error('Error al manejar el like:', error);
    }
  };

  const handleUnlike = async (postId) => {
    console.log('Intentando dar like a postId:', postId);
    try {
      await removeLike(postId);
      setLikes((prevLikes) => prevLikes.filter((like) => like.postId !== postId)); 
    } catch (error) {
      console.error('Error al manejar el unlike:', error);
    }
  };

  return (
    <LikeContext.Provider value={{ likes, handleLike, handleUnlike }}>
      {children}
    </LikeContext.Provider>
  );
};

// Hook para usar el contexto de likes
export const useLikes = () => useContext(LikeContext);

