import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { logoImg } from '../utils';
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
        <div className="text-white text-xl font-bold flex items-center">
          <img src={logoImg} className="w-10" alt="logo" />
          <Link to="/" className="ml-2">Bio Blog</Link>
        </div>

        {/* Search Component */}
        <div className="hidden md:block w-full max-w-md">
          <Search onSearch={onSearch} />
        </div>

        {/* Links de navegación para pantallas grandes */}
        <div className="hidden md:flex space-x-6">
          <ul className="flex space-x-6">
            <li><Link className="text-gray-400 hover:text-white" to="/">Inicio</Link></li>
            <li><Link className="text-gray-400 hover:text-white" to="/blog">Blog</Link></li>
            <li><Link className="text-gray-400 hover:text-white" to="/nosotros">Nosotros</Link></li>
            <li><Link className="text-gray-400 hover:text-white" to="/contacto">Contacto</Link></li>
          </ul>
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
        <div className="md:hidden">
          <Search onSearch={onSearch} /> 
          <ul className="space-y-2 mt-4 flex flex-col items-center">
            <li><Link className="text-gray-400 hover:text-white" to="/">Inicio</Link></li>
            <li><Link className="text-gray-400 hover:text-white" to="/blog">Blog</Link></li>
            <li><Link className="text-gray-400 hover:text-white" to="/nosotros">Nosotros</Link></li>
            <li><Link className="text-gray-400 hover:text-white" to="/contacto">Contacto</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

