import React, { useState } from 'react';
import Search from './Search';

const Navbar = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-xl font-bold">
          <a href="#">Bio Blog</a>
        </div>

        {/* Search Component */}
        <div className="hidden md:block w-full max-w-md">
          <Search onSearch={onSearch} />
        </div>

        {/* Links de navegación para pantallas grandes */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-white">Inicio</a>
          <a href="#" className="text-gray-400 hover:text-white">Servicios</a>
          <a href="#" className="text-gray-400 hover:text-white">Nosotros</a>
          <a href="/contacto" className="text-gray-400 hover:text-white">Contacto</a>
        </div>

        {/* Botón del menú móvil */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-400 hover:text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Menú desplegable para dispositivos móviles */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Search onSearch={onSearch} /> 
          <a href="#" className="block text-gray-400 hover:text-white">Inicio</a>
          <a href="#" className="block text-gray-400 hover:text-white">Servicios</a>
          <a href="#" className="block text-gray-400 hover:text-white">Nosotros</a>
          <a href="#" className="block text-gray-400 hover:text-white">Contacto</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
