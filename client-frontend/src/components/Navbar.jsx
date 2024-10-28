import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logoImg } from '../utils';
import Search from './Search';
import ButtonIcon from '../components/ButtonIcon';

const Navbar = ({ onSearch }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [username, setUsername] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const name = localStorage.getItem('name'); 

        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const userRole = decodedToken.role;
            setIsAdmin(userRole === 'admin');
            setIsLoggedIn(true);
            if (name) setUsername(name); 
        }
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navigateToRegister = () => {
        navigate(location.pathname === '/registro' ? '/' : '/registro');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name'); 
        setIsLoggedIn(false);
        setIsAdmin(false);
        setUsername('');
        navigate('/');
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-xl font-bold flex items-center">
                    <img src={logoImg} className="w-10" alt="logo" />
                    <Link to="/" className="ml-2">Bio Blog</Link>
                </div>

                {/* Show registration button only if not logged in */}
                {!isLoggedIn && (
                    <div>
                        <ButtonIcon
                            icon="fas fa-user-plus fa-2x"
                            onClick={navigateToRegister} 
                            title="Regístrate aquí"
                        />
                    </div>
                )}

                {/* Show greeting with user's name if logged in */}
                {isLoggedIn && (
                    <div className="text-white mr-4">
                        Hola, {username}
                    </div>
                )}

                <div className="hidden md:flex space-x-6">
                    <ul className="flex space-x-6">
                        <li><Link className="text-gray-400 hover:text-white" to="/">Inicio</Link></li>
                        <li><Link className="text-gray-400 hover:text-white" to="/blog">Blog</Link></li>
                        <li><Link className="text-gray-400 hover:text-white" to="/nosotros">Nosotros</Link></li>
                        <li><Link className="text-gray-400 hover:text-white" to="/contacto">Contacto</Link></li>
                        {isAdmin && (
                            <li><Link className="text-gray-400 hover:text-white" to="/adminPage">AdminPage</Link></li>
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

            {/* Mobile menu  */}
            {isOpen && (
                <div className="md:hidden">
                    <Search onSearch={onSearch} />
                    <ul className="space-y-2 mt-4 flex flex-col items-center">
                        <li><Link className="text-gray-400 hover:text-white" to="/">Inicio</Link></li>
                        <li><Link className="text-gray-400 hover:text-white" to="/blog">Blog</Link></li>
                        <li><Link className="text-gray-400 hover:text-white" to="/nosotros">Nosotros</Link></li>
                        <li><Link className="text-gray-400 hover:text-white" to="/contacto">Contacto</Link></li>
                        {isAdmin && (
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








