// Profile.jsx
import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token'); // Obtener el token de localStorage
            const response = await fetch('http://localhost:5000/api/auth/perfil', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Asegúrate de que el token se envía aquí
                },
            });

            // Verifica si la respuesta fue exitosa
            if (!response.ok) {
                const errorData = await response.json(); // Obtener el mensaje de error
                setError(errorData.message);
            } else {
                const data = await response.json(); // Procesar los datos
                setUser(data);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div>
            {error && <p>{error}</p>}
            {user ? (
                <div>
                    <h1>Bienvenido a tu perfil</h1>
                    <p>Tu rol es: {user.role}</p>
                    <p>ID de usuario: {user.userId}</p>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};

export default Profile;



