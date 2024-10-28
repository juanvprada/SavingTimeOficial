// LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoImg } from '../utils';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    // Handling of the login form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!email || !password) {
            setError('Por favor, completa todos los campos.');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5000/api/auth/acceso', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            // Check if the response was successful
            if (!response.ok) {
                const errorData = await response.json();
                console.log('Error de respuesta del servidor:', errorData);
                throw new Error(errorData.message || 'Error al iniciar sesión');
            }
            console.log('Respuesta de la API:', response.data);
            // Processes the response in case of success
            const data = await response.json();
            console.log('Nombre recibido de la API:', data.name);
            if (data.token) {
                // Stores token, role and user name in localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role);
                localStorage.setItem('name', data.name); 
                
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
        <section className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <div className="text-center mb-6">
                <img src={logoImg} alt="Logo" className="mx-auto w-24 h-24 mb-4" />
                <h2 className="text-2xl font-semibold text-green-600">Iniciar Sesión</h2>
                <p className="text-gray-500">Accede a tu cuenta para continuar.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                    <label className="block text-gray-700" htmlFor="email">Correo Electrónico</label>
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
                    <label className="block text-gray-700" htmlFor="password">Contraseña</label>
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
                <span className="text-gray-600">¿Has olvidado tu contraseña?</span>{' '}
                <button
                    onClick={() => navigate('/recuperar-password')}
                    className="text-green-600 hover:underline focus:outline-none"
                >
                    Recuperar contraseña
                </button>
            </p>
        </section>
    );
};

export default LoginForm;








