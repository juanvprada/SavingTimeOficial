import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchLikes, addLike, removeLike } from '../api/likesApi';

// Creamos un contexto para los likes
const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  // Inicializamos el estado de likes como un array vacío
  const [likes, setLikes] = useState([]);

  // Utilizamos useEffect para cargar los likes al montar el componente
  useEffect(() => {
    const loadLikes = async () => {
      try {
        // Obtenemos los likes desde la API
        const data = await fetchLikes();
        // Actualizamos el estado con los likes obtenidos
        setLikes(data);
      } catch (error) {
        // Manejamos errores en la carga de likes
        console.error('Error al cargar likes:', error);
      }
    };
    loadLikes();
  }, []); 

  // Función para manejar el agregar un like a un post
  const handleLike = async (postId) => {
    try {
      // Llamamos a la API para agregar un like y obtenemos el nuevo like
      const newLike = await addLike(postId);
      // Actualizamos el estado agregando el nuevo like
      setLikes((prevLikes) => [...prevLikes, newLike]);
    } catch (error) {
      // Manejamos errores en el manejo del like
      console.error('Error al manejar el like:', error);
    }
  };

  // Función para manejar el eliminar un like de un post
  const handleUnlike = async (postId) => {
    console.log('Intentando eliminar like para postId:', postId);
    try {
      // Llamamos a la API para eliminar el like
      await removeLike(postId);
      // Actualizamos el estado eliminando el like correspondiente
      setLikes((prevLikes) => prevLikes.filter((like) => like.postId !== postId));
    } catch (error) {
      // Manejamos errores en el manejo del unlike
      console.error('Error al manejar el unlike:', error);
    }
  };

  // Proporcionamos el contexto a los componentes hijos
  return (
    <LikeContext.Provider value={{ likes, handleLike, handleUnlike }}>
      {children}
    </LikeContext.Provider>
  );
};

// Hook para usar el contexto de likes en otros componentes
export const useLikes = () => useContext(LikeContext);


