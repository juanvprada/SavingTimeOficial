import React from "react";
import { homeVid } from "../utils";
import Carousel from "../components/Carousel";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Video home */}
      <div className="relative">
        <video
          autoPlay
          loop
          muted
          playsInline={true}
          className="w-full h-50 object-cover"
        >
          <source src={homeVid} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <h1 className="text-white text-8xl font-bold sm: text-md">
            Bio Blog
          </h1>
        </div>
      </div>

      {/* Additional information boxes */}
      <section className="container mx-auto py-12 px-4">
        <div className="w-full">
          <Carousel />
        </div>
        <div className="flex flex-col md:grid-cols-3 gap-8 mt-6">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Apartado 1
            </h2>
            <p className="text-gray-700">Contenido para el Apartado 1...</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Apartado 2
            </h2>
            <p className="text-gray-700">Contenido para el Apartado 2...</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Apartado 3
            </h2>
            <p className="text-gray-700">Contenido para el Apartado 3...</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
