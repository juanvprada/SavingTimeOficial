import React from 'react';
import { construccionImg } from '../utils';
import { Link } from 'react-router-dom';

const UnderConstruction = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Página en Construcción</h1>
        <p className="text-lg text-gray-600 mb-8">Estamos trabajando arduamente para ofrecerte una mejor experiencia. Vuelve pronto.</p>
        <img src={construccionImg} alt="En construcción" className="mx-auto mb-8 w-1/2" />
        <div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"><Link to="/contacto" rel="noopener noreferrer">Contacta con nosotros</Link></button>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;