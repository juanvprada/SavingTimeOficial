import React from 'react';

const Footer = () => (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        
        {/* Acerca de nosotros */}
        <div className="mb-6 md:mb-0">
          <h4 className="text-xl font-semibold mb-2">Acerca de nosotros</h4>
          <p className="text-gray-400">Somos una compañía dedicada a ofrecer los mejores productos.</p>
        </div>

        {/* Enlaces útiles */}
        <div className="mb-6 md:mb-0">
          <h4 className="text-xl font-semibold mb-2">Enlaces útiles</h4>
          <ul>
            <li><a href="#" className="text-gray-400 hover:text-white">Inicio</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Servicios</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Contacto</a></li>
          </ul>
        </div>

        {/* Síguenos */}
        <div>
          <h4 className="text-xl font-semibold mb-2">Síguenos</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
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