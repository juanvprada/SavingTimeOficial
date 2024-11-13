import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/store';
import axios from 'axios';

const LoginForm = ({ inputTextColor, formBackground }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const setToken = useStore((state) => state.setToken);
    const setRole = useStore((state) => state.setRole);
    const setUsername = useStore((state) => state.setUsername);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/acceso', { email, password });
            const { token, role, name } = response.data;

            if (token) {
                // Almacena el token y otros datos Zustand
                setToken(token);
                setRole(role);
                setUsername(name);

                navigate('/blog');
            } else {
                setError('Correo electrónico o contraseña incorrectos.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('No se recibió respuesta del servidor.');
        }
    };

    return (
        <section className={`max-w-md mx-auto p-6 rounded-lg shadow-md mt-10 ${formBackground}`}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                    <label htmlFor="email" className={`block text-sm font-semibold ${inputTextColor}`}>
                        Correo Electrónico
                    </label>
                    <input
                        className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-green-200"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Introduce tu correo electrónico"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className={`block text-sm font-semibold ${inputTextColor}`}>
                        Contraseña
                    </label>
                    <input
                        className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-green-200"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Introduce tu contraseña"
                        required
                    />
                </div>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                <button className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition" type="submit">
                    Iniciar Sesión
                </button>
            </form>
            <p className="mt-4 text-center">
                <span className={`text-sm ${inputTextColor} hover:text-green-500`}>¿Has olvidado tu contraseña?</span>{' '}
                <button
                    onClick={() => navigate('/recuperar-password')}
                    className="text-customGreen hover:underline focus:outline-none"
                >
                    Recuperar contraseña
                </button>
            </p>
        </section>
    );
};

export default LoginForm;

