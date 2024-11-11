import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOnePost, deletePost } from '../services/services';
import { getLikesCount, toggleLike } from '../services/likeServices';
import ButtonIcon from '../components/ButtonIcon';

const PostDetail = ({ role, token }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const navigate = useNavigate();
  const postRef = useRef(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getOnePost(id);
        setPost(fetchedPost);

        // Obtener el número de likes de este post
        const likeCount = await getLikesCount(id);
        setLikes(likeCount.count);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (postRef.current && !postRef.current.contains(event.target)) {
        navigate('/blog');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navigate]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este post?");
    if (confirmDelete) {
      try {
        await deletePost(id);
        navigate('/blog');
      } catch (error) {
        console.error("Error al eliminar el post:", error);
      }
    }
  };

  const handleLike = async () => {
    try {
      const response = await toggleLike(id);
      setLikes((prevLikes) => response.liked ? prevLikes + 1 : prevLikes - 1);
    } catch (error) {
      console.error("Error al dar like:", error);
    }
  };

  if (!post) return <div className="text-center text-xl text-gray-600">Cargando...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 relative overflow-hidden mt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-orange-100 to-green-100 opacity-80 z-0"></div>
      <div className="absolute inset-0 bg-pattern-texture opacity-30 z-0"></div>

      <div className="w-full max-w-7xl bg-white rounded-lg shadow-2xl p-8 md:p-12 z-10">
        <div className="flex flex-col items-center mb-12">
          <img
            src={post.image}
            alt={post.name}
            className="lg:w-full sm:w-full lg:h-[60vh] sm:h-[30vh] mb-16 object-cover rounded-lg shadow-lg"
          />
          <h1 className="lg:text-5xl sm:text-5xl font-bold text-green-600 tracking-tight text-center">{post.name}</h1>
          {/* <p className="text-xl text-green-600 mt-2 mb-6 text-center">{new Date(post.createdAt).toLocaleDateString()}</p> */}
        </div>



        <p className="text-xl text-gray-700 leading-relaxed mb-8 text-center">{post.description}</p>

        <div className="mt-6 flex justify-between items-center">
          {role === 'admin' && token && (
            <ButtonIcon
              icon="fas fa-edit"
              onClick={() => navigate(`/editar/${post.id}`)}
              title="Editar"
              className="text-white bg-green-600 hover:bg-green-700 transition duration-300 p-6 rounded-full shadow-md transform hover:scale-110"
            />
          )}
          {role === 'admin' && token && (
            <ButtonIcon
              icon="fas fa-trash"
              onClick={handleDelete}
              title="Eliminar"
              className="text-white bg-red-600 hover:bg-red-700 transition duration-300 p-6 rounded-full shadow-md transform hover:scale-110"
            />
          )}
        </div>

        {/* Likes Section */}
        <div className="mt-8 flex justify-center items-center space-x-6">
          <ButtonIcon
            icon={likes > 0 ? "fas fa-heart text-red-500" : "far fa-heart"}
            onClick={handleLike}
            title={likes > 0 ? "Quitar like" : "Dar like"}
            className="text-white bg-orange-500 hover:bg-orange-600 transition duration-300 p-6 rounded-full shadow-lg transform hover:scale-110"
          />
          <span className="text-2xl text-gray-800 font-semibold">{likes} Likes</span>
        </div>


      </div>
      <div className="mt-10 flex justify-center">
  <button
    onClick={() => navigate('/blog')}
    className="bg-green-600 w-48 text-white text-lg px-6 py-3 rounded-md hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-md"
  >
    Volver
  </button>
</div>

    </div>

  );
};

export default PostDetail;
