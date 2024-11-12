import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logoImg } from '../utils';
import Search from './Search';
import ButtonIcon from '../components/ButtonIcon';
import useStore from '../store/store'; 

const Navbar = ({ onSearch }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const isLoggedIn = useStore((state) => !!state.token); 
    const username = useStore((state) => state.username); 
    const role = useStore((state) => state.role);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navigateToRegister = () => {
        navigate(location.pathname === '/acceso' ? '/' : '/acceso');
    };

    const handleLogout = () => {
        useStore.getState().setToken(null);
        useStore.getState().setRole(null);
        useStore.getState().setUsername(null);
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        navigate('/');
    };

    return (
        <nav className=" fixed top-0 left-0 right-0 p-4 mb-8 bg-gray-800 z-50 shadow-md">

        <div className="container mx-auto flex justify-between items-center">
            <div className="text-white text-xl font-bold flex items-center">
                <img src={logoImg} className="w-10" alt="logo" />
                <Link to="/" className="ml-2 opacity-50">Bio Blog</Link>
            </div>
        

                {/* {!isLoggedIn && (
                    <div>
                        <ButtonIcon
                            icon="fas fa-user-plus fa-2x"
                            onClick={navigateToRegister}
                            title="Regístrate aquí"
                        />
                    </div>
                )} */}

                {isLoggedIn && (
                    <div className="mr-4">
                        <span className="text-sm md:text-xl text-white font-bold flex items-center">
                            Hola, {username}
                        </span>
                    </div>
                )}

                <div className="hidden md:flex space-x-6">
                    <ul className="flex space-x-6">
                        <li><Link className="text-gray-400 hover:text-white" to="/">Inicio</Link></li>
                        <li><Link className="text-gray-400 hover:text-white" to="/blog">Blog</Link></li>
                        <li><Link className="text-gray-400 hover:text-white" to="/nosotros">Nosotros</Link></li>
                        <li><Link className="text-gray-400 hover:text-white" to="/contacto">Contacto</Link></li>
                        {role === 'admin' && (
                            <li><Link className="text-gray-400 hover:text-white" to="/admin">AdminPage</Link></li>
                        )}
                        {isLoggedIn && (
                            <li>
                                <ButtonIcon
                                    icon="fas fa-sign-out-alt"
                                    onClick={handleLogout}
                                    title="Cerrar Sesión"
                                />
                            </li>
                        )}
                    </ul>
                </div>

                <div className="md:hidden">
    <button onClick={toggleMenu} className="text-gray-400 hover:text-white focus:outline-none">
        {/* Mostrar un ícono diferente dependiendo del estado `isOpen` */}
        {isOpen ? (
            <img src="/src/assets/icons/menu-hamburguesa-close.svg" alt="Cerrar menú" className="w-6 h-6" />
        ) : (
            <img src="/src/assets/icons/menu-hamburguesa.svg" alt="Abrir menú" className="w-6 h-6" />
        )}
    </button>
</div>

            </div>

            {isOpen && (
                <div className="md:hidden">
                    <Search onSearch={onSearch} />
                    <ul className="space-y-2 mt-4 flex flex-col items-center">
                        <li><Link className="text-gray-400 hover:text-white" to="/">Inicio</Link></li>
                        <li><Link className="text-gray-400 hover:text-white" to="/blog">Blog</Link></li>
                        <li><Link className="text-gray-400 hover:text-white" to="/nosotros">Nosotros</Link></li>
                        <li><Link className="text-gray-400 hover:text-white" to="/contacto">Contacto</Link></li>
                        {role === 'admin' && (
                            <li><Link className="text-gray-400 hover:text-white" to="/admin">AdminPage</Link></li>
                        )}
                        {isLoggedIn && (
                            <li>
                                <ButtonIcon
                                    icon="fas fa-sign-out-alt"
                                    onClick={handleLogout}
                                    title="Cerrar Sesión"
                                />
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
