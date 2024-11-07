import React from 'react';
import { homeVid } from '../utils';
import Carousel from '../components/Carousel';
import AuthForm from '../components/AuthForm'; 

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Video de fondo */}
      <div className="relative">
        <video autoPlay loop muted playsInline className="w-full h-screen object-cover">
          <source src={homeVid} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>

        {/* Título y AuthForm */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 px-4">
          <h1 className="text-white text-opacity-30 font-bold text-5xl sm:text-6xl md:text-7xl lg:text-9xl mb-4 mt-10 sm:mt-0">
            Bio Blog
          </h1>
          <div className="w-full max-w-md">
            <AuthForm />
          </div>
        </div>
      </div>

      {/* Sección adicional */}
      <section className="container mx-auto py-12 px-4">
        <div className="w-full mb-8">
          <Carousel />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-green-600 mb-4">Apartado 1</h2>
            <p className="text-gray-700">Contenido para el Apartado 1...</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-green-600 mb-4">Apartado 2</h2>
            <p className="text-gray-700">Contenido para el Apartado 2...</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-green-600 mb-4">Apartado 3</h2>
            <p className="text-gray-700">Contenido para el Apartado 3...</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;


