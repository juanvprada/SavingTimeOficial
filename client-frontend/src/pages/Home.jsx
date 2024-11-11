import React from 'react';
import { homeVid } from '../utils';
import Carousel from '../components/Carousel';
import AuthForm from '../components/AuthForm';
import useStore from '../store/store';

const Home = () => {
  const isLoggedIn = useStore((state) => !!state.token);

  return (
    <div className=" pt-16 min-h-screen">
      {/* Video de fondo */}
      <div className="relative">
        <video autoPlay loop muted playsInline className="w-full h-screen object-cover">
          <source src={homeVid} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>

        {/* Superposición y contenido */}
        <div className="absolute inset-0 flex flex-col sm:flex-row bg-black bg-opacity-70 px-4">
          {/* Contenedor del título, que en móviles estará en la parte superior */}
          <div className="flex-1 flex items-center justify-center text-center mb-4 sm:mb-0">
            <h1 className="text-white text-opacity-50 font-bold text-5xl sm:text-6xl md:text-7xl lg:text-9xl ">
              Bio Blog
            </h1>
          </div>

          {/* Contenedor del formulario, que en móviles estará debajo del título */}
          <div className="flex-1 flex items-center justify-center">
            {!isLoggedIn && (
              <div className="w-full max-w-md">
                <AuthForm />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sección adicional */}
      <section className="container mx-auto py-12 px-4">
        <div className="w-full mb-8">
          <Carousel />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white p-6 shadow-md rounded-lg">
              <h2 className="text-xl sm:text-2xl font-bold text-green-600 mb-4">
                Apartado {item}
              </h2>
              <p className="text-gray-700">Contenido para el Apartado {item}...</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
