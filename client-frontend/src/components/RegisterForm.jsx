import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
// import { logoImg } from '../utils';
import useStore from '../store/store';

const RegisterForm = ({ initialData = {}, editMode = false }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const setToken = useStore((state) => state.setToken);
    const setRole = useStore((state) => state.setRole);
    const setUsername = useStore((state) => state.setUsername);

    useEffect(() => {
        if (editMode && initialData) {
            setName(initialData.name || '');
            setEmail(initialData.email || '');
        }
    }, [initialData, editMode]);

    const validatePasswordStrength = (password) => {
        const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return strongPasswordRegex.test(password);
    };

    const handlePasswordChange = (e) => {
        const inputPassword = e.target.value;
        setPassword(inputPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editMode) {
                await axios.put('http://localhost:5000/api/users/' + initialData._id, {
                    name,
                    email,
                    password,
                });
                setMessage('Usuario actualizado correctamente.');
            } else {
                const response = await axios.post('http://localhost:5000/api/users/register', {
                    name,
                    email,
                    password,
                });
                setMessage('Usuario registrado con éxito.');

                // Store name and token in Zustand
                const { token, role } = response.data;
                setToken(token);
                setRole(role);
                setUsername(name);

                resetRegisterForm();
                setTimeout(() => {
                    navigate('/blog');
                },);
            }
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message || 'Error al registrar usuario');
            } else if (error.request) {
                setMessage('No se recibió respuesta del servidor.');
            } else {
                setMessage('Error al configurar la solicitud: ' + error.message);
            }
        }
    };

    const resetRegisterForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setTimeout(() => {
            setMessage('');
        }, 2000);
    };

    return (
        <section className="max-w-md mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-md mt-10">
            {/* <div className="text-center mb-6">
                <img src={logoImg} alt="Logo" className="mx-auto w-24 h-24 mb-4" />
                <h2 className="text-2xl font-semibold text-green-600">Registro de Usuario</h2>
                <p className="text-gray-500">Crea una cuenta para acceder a contenido exclusivo.</p>
            </div> */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                    <label className="block text-gray-800">Nombre de usuario:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-green-200"
                    />
                </div>
                <div className="form-group">
                    <label className="block text-gray-800">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-green-200"
                    />
                </div>
                <div className="form-group">
                    <label className="block text-gray-800">Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-green-200"
                    />
                </div>
                <button type="submit" className="w-full bg-green-600 text-gray-800 font-semibold py-2 rounded hover:bg-green-700 transition">
                    Registrar
                </button>
            </form>
            {message && <p className="text-red-500 text-center mt-4">{message}</p>}
            <p className="mt-4 text-center">
                <span className="text-gray-800">¿Has olvidado tu contraseña?</span>{' '}
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









