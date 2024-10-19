import React, { useState } from 'react';
import { Create } from '../pages/Createpost';
import { useLocation } from 'react-router-dom';

const IconCreate = () => {
  const [showForm, setShowForm] = useState(false);
  const location = useLocation(); 

  const handleClick = () => {
    setShowForm(!showForm);
  };

  // =====================================================
  // Ponemos las rutas donde no queremos mostrar el icono
  // =====================================================
  const hideIconRoutes = ['/registro', '/acceso', '/recuperar-contraseña'];

  // ==================================================================
  // Verificamos si la ruta actual está en la lista de rutas a ocultar
  // ==================================================================
  const shouldHideIcon = hideIconRoutes.includes(location.pathname);

  if (shouldHideIcon) return null;

  return (
    <div className="fixed bottom-5 right-5 text-center">
      <div 
        onClick={handleClick} 
        className="text-4xl cursor-pointer inline-block bg-green-500 text-white rounded-full w-14 h-14 leading-[3rem] text-center transition-colors duration-300 hover:bg-green-600"
      >
        +
      </div>
      {showForm && (
        <div className="mt-5">
          <Create onCancel={() => setShowForm(false)} /> 
        </div>
      )}
    </div>
  );
};

export default IconCreate;



