import React from 'react';
import { bosqueImg, reciclaImg, solarImg } from '../utils/index.js';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Encabezado */}
      <header className="bg-green-600 text-white py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Bienvenidos a EcoBlog</h1>
          <p className="mt-4 text-xl">Tu fuente de información para un estilo de vida sostenible y ecológico.</p>
        </div>
      </header>

      {/* Sección de tarjetas */}
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Artículos Destacados</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img 
              src={ bosqueImg }
              alt="Bosque y naturaleza"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-green-600 mb-2">La Importancia de Proteger los Bosques</h3>
              <p className="text-gray-700 mb-4">
                Los bosques son esenciales para mantener el equilibrio ecológico. Aprende cómo puedes ayudar a protegerlos.
              </p>
              <a href="#" className="text-green-600 font-semibold hover:underline">
                Leer más...
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img 
              src= { reciclaImg }
              alt="Reciclaje"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-green-600 mb-2">Guía de Reciclaje para Principiantes</h3>
              <p className="text-gray-700 mb-4">
                ¿No sabes por dónde empezar a reciclar? Aquí te ofrecemos una guía simple para que empieces hoy mismo.
              </p>
              <a href="#" className="text-green-600 font-semibold hover:underline">
                Leer más...
              </a>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img 
              src= { solarImg }
              alt="Energía Solar"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-green-600 mb-2">Beneficios de la Energía Solar</h3>
              <p className="text-gray-700 mb-4">
                La energía solar es una de las fuentes renovables más eficientes. Descubre cómo aprovecharla en tu hogar.
              </p>
              <a href="#" className="text-green-600 font-semibold hover:underline">
                Leer más...
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;