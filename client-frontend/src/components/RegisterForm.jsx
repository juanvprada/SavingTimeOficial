import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/store';

const RegisterForm = ({ inputTextColor, formBackground }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const setToken = useStore((state) => state.setToken);
    const setRole = useStore((state) => state.setRole);
    const setUsername = useStore((state) => state.setUsername);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/users/register', {
                name,
                email,
                password,
            });
            setMessage('Usuario registrado con éxito.');

            // Guardar el token y el rol en Zustand
            const { token, role } = response.data;
            setToken(token);
            setRole(role);
            setUsername(name);

            setTimeout(() => {
                navigate('/blog');
            }, 1000);
        } catch (error) {
            setMessage(error.response ? error.response.data.message : 'Error al registrar usuario');
        }
    };

    return (
        <section className={`max-w-md mx-auto p-6 rounded-lg shadow-md mt-10 ${formBackground}`}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                    <label className={`block text-sm font-semibold ${inputTextColor}`}>Nombre de usuario:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Introduce tu nombre de usuario"
                        className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-green-200"
                    />
                </div>
                <div className="form-group">
                    <label className={`block text-sm font-semibold ${inputTextColor}`}>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Introduce tu correo electrónico"
                        className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-green-200"
                    />
                </div>
                <div className="form-group">
                    <label className={`block text-sm font-semibold ${inputTextColor}`}>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Introduce tu contraseña"
                        className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-green-200"
                    />
                </div>
                <button type="submit" className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition">
                    Registrar
                </button>
            </form>
            {message && <p className="text-red-500 text-center mt-4">{message}</p>}
            <p className="mt-4 text-center">
                <span className={`text-sm ${inputTextColor}`}>¿Has olvidado tu contraseña?</span>{' '}
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

export default RegisterForm;









