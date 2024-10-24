// Blog.jsx
import React, { useState, useEffect } from 'react';
import { getPosts, deletePost } from '../services/services'; 
import ButtonIcon from '../components/ButtonIcon'; 
import { useNavigate } from 'react-router-dom'; 
import { Create } from './Createpost';
import IconCreate from '../components/IconCreate'; 

const Blog = () => {
  const [search, setSearch] = useState('');
  const [articles, setArticles] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPosts(); 
        setArticles(posts);
      } catch (error) {
        console.error('Error al obtener los artículos:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este post?");
    if (confirmDelete) {
      try {
        await deletePost(id);
        // Refresca la lista de artículos después de eliminar
        setArticles(articles.filter(article => article.id !== id));
      } catch (error) {
        console.error("Error al eliminar el post:", error);
      }
    }
  };

  const handleNewPost = (newPost) => {
    // Agregar el nuevo post a la lista de artículos
    setArticles(prevArticles => [...prevArticles, newPost]);
  };

  const filteredArticles = articles.filter(article =>
    article.name.toLowerCase().includes(search.toLowerCase()) ||
    article.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-green-600 text-white py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Bienvenidos a EcoBlog</h1>
          <p className="mt-4 text-xl">Tu fuente de información para un estilo de vida sostenible y ecológico.</p>
        </div>
      </header>
      <h2 className="text-3xl font-semibold text-center text-gray-800">Todas las publicaciones</h2>
      <section className="container mx-auto py-12 px-4">
        <div className="mb-8 text-center">
          <input
            type="text"
            className="px-4 py-2 w-full md:w-1/2 border border-gray-300 rounded-md"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div key={article.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={article.image}
                alt={article.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-600 mb-2">{article.name}</h3>
                <p className="text-gray-700 mb-4">{article.description}</p>
                <div className="flex justify-between">
                  <ButtonIcon
                    icon="fas fa-edit" 
                    onClick={() => navigate(`/editar/${article.id}`)} 
                    title="Editar"
                  />
                  <ButtonIcon
                    icon="fas fa-trash" 
                    onClick={() => handleDelete(article.id)}
                    title="Eliminar"
                  />
                </div>
                <a href="#" className="text-green-600 font-semibold hover:underline">Leer más...</a>
              </div>
            </div>
          ))}
        </div>

        {/* Componente Create para crear un nuevo post */}
        {showCreate && (
          <Create
            onCancel={() => setShowCreate(false)}
            onSubmit={handleNewPost} 
          />
        )}

        {/* Componente IconCreate para el botón de nuevo post */}
        <IconCreate onClick={() => setShowCreate(true)} />
      </section>
    </div>
  );
};

export default Blog;







