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
    try {
      await updatePost(id, updatedPost); 
      alert("Post actualizado exitosamente");
      navigate('/blog');
    } catch (error) {
      console.error("Error al actualizar el Post:", error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Editar Post</h2>
      {/* Pasamos el post existente al componente Create para editar */}
      <Create post={post} onSubmit={handleUpdate} />
    </div>
  );
};

export default EditPost;




