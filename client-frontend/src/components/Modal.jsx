// Modal.jsx
import React from 'react';

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Fondo oscuro */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Contenido del modal */}
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-lg mx-auto">
        {/* Botón para cerrar */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Contenido pasado como children */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
