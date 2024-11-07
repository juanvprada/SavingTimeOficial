import React from "react";
import { homeVid } from "../utils";
import Carousel from "../components/Carousel";
import hands from "../assets/news/hands.jpg";
import bread from "../assets/news/bread.jpg";
import market from "../assets/news/market.jpg";

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
          {/* Primer bloque con imagen a la derecha */}
          <div className="bg-white p-6 shadow-md rounded-lg flex items-center space-x-6">
            {/* Contenedor del texto */}
            <div className="w-1/2">
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                Reciclaje en la Comunidad de Madrid: ¡Reduce tu Huella
                Ecológica!
              </h2>
              <p className="text-gray-700">
                Madrid está comprometida con el reciclaje como una forma de vida
                sostenible. Clasificar correctamente papel, plástico, vidrio y
                residuos orgánicos ayuda a mejorar el proceso y reducir nuestro
                impacto en el planeta. Evita los plásticos de un solo uso, y
                considera alternativas como comprar a granel o reutilizar
                bolsas. Además, recicla aparatos electrónicos y pilas en puntos
                específicos. ¡Cada pequeña acción suma para un Madrid más
                limpio!
              </p>
            </div>

            {/* Imagen */}
            <div className="w-1/2">
              <img
                src={hands}
                alt="Reciclaje"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>
          {/* Segundo bloque con imagen bread.jpg */}
          <div className="bg-white p-6 shadow-md rounded-lg flex items-center space-x-6">
            <div className="w-1/2">
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                Consejos para Reducir el Desperdicio de Alimentos en Casa
              </h2>
              <p className="text-gray-700">
                Planificar tus comidas es clave para evitar el desperdicio de
                alimentos y ahorrar. Compra solo lo necesario, y busca recetas
                que aprovechen cada ingrediente, como usar cáscaras para caldos
                o frutas maduras para batidos. Almacenar correctamente también
                ayuda a prolongar la frescura de los alimentos. Si tienes
                sobras, reutilízalas para crear platos nuevos. Así ayudas al
                planeta y a tu economía familiar. ¡Vivir sosteniblemente es más
                fácil de lo que piensas!
              </p>
            </div>
            <div className="w-1/2">
              <img
                src={bread}
                alt="Reducir desperdicio de alimentos"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Tercer bloque con imagen market.jpg */}
          <div className="bg-white p-6 shadow-md rounded-lg flex items-center space-x-6">
            <div className="w-1/2">
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                Logros en Sostenibilidad en Madrid: Iniciativas que Marcan la
                Diferencia
              </h2>
              <p className="text-gray-700">
                Madrid ha dado grandes pasos hacia la sostenibilidad, desde el
                aumento del reciclaje en centros urbanos hasta la promoción de
                mercados locales sostenibles. El apoyo a los agricultores
                locales y los productos a granel reducen los desechos plásticos.
                Además, los programas educativos en colegios están formando a
                jóvenes en el cuidado ambiental. Gracias al compromiso de todos,
                Madrid avanza hacia un futuro más consciente y respetuoso con el
                medio ambiente.
              </p>
            </div>
            <div className="w-1/2">
              <img
                src={market}
                alt="Iniciativas de sostenibilidad"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
