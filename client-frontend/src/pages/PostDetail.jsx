import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOnePost } from '../services/services';
import ButtonIcon from '../components/ButtonIcon';

const PostDetail = ({ role, token }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const postRef = useRef(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getOnePost(id);
        setPost(fetchedPost);
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

  if (!post) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <div
        className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl p-10 h-full"
        ref={postRef}
      >
        <h1 className="text-4xl font-bold text-green-600 mb-6">{post.name}</h1>
        <img src={post.image} alt={post.name} className="w-full h-96 object-cover mb-6" />
        <p className="text-lg text-gray-700 leading-relaxed mb-6">{post.description}</p>

        <div className="mt-6 flex justify-between items-center">
          {role === 'admin' && token && (
            <ButtonIcon
              icon="fas fa-edit"
              onClick={() => navigate(`/editar/${post.id}`)}
              title="Editar"
            />
          )}
          {role === 'admin' && token && (
            <ButtonIcon
              icon="fas fa-trash"
              onClick={() => handleDelete(post.id)}
              title="Eliminar"
            />
          )}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate('/blog')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
