// EditPost.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOnePost, updatePost } from '../services/services'; 
import { Create } from './Createpost'; 

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar el post existente cuando el componente se monta
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getOnePost(id);
        setPost(postData);
      } catch (error) {
        console.error("Error al obtener el post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Función que se pasa a `Create` para manejar la actualización
  const handleUpdate = async (updatedPost) => {
    const formData = new FormData();
    formData.append('name', updatedPost.get('name'));
    formData.append('kindOfPost', updatedPost.get('kindOfPost'));
    formData.append('description', updatedPost.get('description'));
  
    if (updatedPost.has('image')) {
      formData.append('image', updatedPost.get('image'));
    }
  
    try {
      await updatePost(id, formData);
      navigate('/blog'); 
    } catch (error) {
      console.error("Error al actualizar el Post:", error);
    }
  };

  // Función para manejar la cancelación
  const handleCancel = () => {
    console.log("Cancelando..."); // Para verificar si la función se llama
    navigate('/blog'); // o prueba con window.location.href = '/blog';
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Editar Post</h2>
      {/* Pasamos el post existente al componente Create para editar */}
      <Create post={post} onSubmit={handleUpdate} />
      
      {/* Botón de cancelar */}
      <button 
        className="text-red-500 mt-4" 
        onClick={handleCancel}
      >
        Cancelar
      </button>
    </div>
  );
};

export default EditPost;






