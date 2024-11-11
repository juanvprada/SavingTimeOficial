import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa';

const Footer = () => (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex justify-between items-center px-4">
        <div className="flex">
          {/* Enlaces útiles */}
          <div className="mb-6 md:mb-0 flexitems-center">
            <h4 className="text-xl font-semibold mb-2 mr-16">Enlaces útiles</h4>
            <ul>
              <li><Link className="text-gray-400 hover:text-white" to="/" rel="noopener noreferrer">Inicio</Link></li>
              <li><Link className="text-gray-400 hover:text-white" to="/blog" rel="noopener noreferrer">Blog</Link></li>
              <li><Link className="text-gray-400 hover:text-white" to="/contacto" rel="noopener noreferrer">Contacto</Link></li>
            </ul>
          </div>
          {/* Síguenos en columna */}
    <div className="md:w-1/2">
      <h4 className="text-xl font-semibold mb-4">Síguenos</h4>
      <ul className="flex flex-col space-y-4">
        <li>
          <Link className="text-gray-400 hover:text-white flex items-center" to="https://github.com/Omarlsant/bio-blog/tree/dev" target="_blank" rel="noopener noreferrer">
            <FaGithub className="mr-2" /> GitHub
          </Link>
        </li>
        <li>
          <Link className="text-gray-400 hover:text-white flex items-center" to="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="mr-2" /> LinkedIn
          </Link>
        </li>
        <li>
          <Link className="text-gray-400 hover:text-white flex items-center" to="" target="_blank" rel="noopener noreferrer">
            <FaDiscord className="mr-2" /> Discord
          </Link>
        </li>
      </ul>
    </div>
  
      </div>
      </div>
        
      {/* Copyright */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center">
        <p className="text-gray-400">&copy; 2024 Bio Blog. Todos los derechos reservados.</p>
      </div>
    </footer>       
  );

export default Footer;