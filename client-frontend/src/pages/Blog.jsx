import React, { useState, useEffect } from 'react';
import { getPosts } from '../services/services'; 

const Blog = () => {
  const [search, setSearch] = useState('');
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchPosts(); 
  }, []);

  const fetchPosts = async () => {
    try {
      const posts = await getPosts(); 
      setArticles(posts);
    } catch (error) {
      console.error('Error al obtener los artículos:', error);
    }
  };

  // Llamar a fetchPosts para actualizar después de crear un post
  const handlePostCreated = () => {
    fetchPosts(); 
  };

  const filteredArticles = articles.filter(article =>
    article.name.toLowerCase().includes(search.toLowerCase()) ||
    article.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Encabezado */}
      <header className="bg-green-600 text-white py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Bienvenidos a EcoBlog</h1>
          <p className="mt-4 text-xl">Tu fuente de información para un estilo de vida sostenible y ecológico.</p>
        </div>
      </header>
      {/* Sección de buscador y publicaciones filtradas */}
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
          {filteredArticles.map((article, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={article.image}
                alt={article.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-600 mb-2">{article.name}</h3>
                <p className="text-gray-700 mb-4">{article.description}</p>
                <a href="#" className="text-green-600 font-semibold hover:underline">Leer más...</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;


