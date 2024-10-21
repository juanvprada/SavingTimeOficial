import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { logoImg } from '../utils';

const RegisterForm = ({ initialData = {}, editMode = false }) => {
    
    const [name, setName] = useState(initialData.name || '');
    const [email, setEmail] = useState(initialData.email || '');
    const [password, setPassword] = useState(initialData.password || '');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        setName(initialData.name || '');
        setEmail(initialData.email || '');
        setPassword('');
    }, [initialData]);

    // ===============================
    // Manejo del envío del formulario
    // ===============================
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editMode) {
                // ==================================
                // Actualización de usuario existente
                // ==================================
                const response = await axios.put('http://localhost:5000/api/users/' + initialData._id, {
                    name,
                    email,
                    password,
                });
                setMessage('Usuario actualizado correctamente.');
            } else {
                // ============================
                // Registro de un nuevo usuario
                // ============================
                const response = await axios.post('http://localhost:5000/api/users/register', {
                    name,
                    email,
                    password,
                });
                setMessage(response.data.message);
                resetRegisterForm();
                navigate('/acceso');
            }
        } catch (error) {
            // =================
            // Manejo de errores
            // =================
            if (error.response) {
                setMessage(error.response.data.message || 'Error al registrar usuario');
            } else if (error.request) {
                setMessage('No se recibió respuesta del servidor.');
            } else {
                setMessage('Error al configurar la solicitud: ' + error.message);
            }
        }
    };

    // ====================================
    // Función para reiniciar el formulario
    // ====================================
    const resetRegisterForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setTimeout(() => {
            setMessage('');
        }, 2000);
    };

    // ==========================
    // Renderizado del componente
    // ==========================
    return (
        <section className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <div className="text-center mb-6">
                <img src={logoImg} alt="Logo" className="mx-auto w-24 h-24 mb-4" />
                <h2 className="text-2xl font-semibold text-green-600">Registro de Usuario</h2>
                <p className="text-gray-500">Crea una cuenta para acceder a contenido exclusivo.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                    <label className="block text-gray-700">Nombre de usuario:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-green-200"
                    />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-green-200"
                    />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700">Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-green-200"
                    />
                </div>
                <button type="submit" className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition">
                    Registrar
                </button>
            </form>
            {message && <p className="text-red-500 text-center mt-4">{message}</p>}
            <div className="text-center mt-4">
                <Link className="text-blue-500 hover:text-blue-700 text-sm" to="/acceso">¿Ya tienes cuenta? Inicia sesión</Link>
                <br />
                <Link className="text-blue-500 hover:text-blue-700 text-sm" to="/recuperar-contraseña">¿Olvidaste tu contraseña?</Link>
            </div>
        </section>
    );
};

export default RegisterForm;





