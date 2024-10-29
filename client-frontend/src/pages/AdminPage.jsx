import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  // Inicializamos el estado de usuarios como un array vacío
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Obtenemos el token de autenticación del almacenamiento local
        const token = localStorage.getItem('token');
        // Realizamos la solicitud GET para obtener la lista de usuarios
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Actualizamos el estado con los usuarios obtenidos
        setUsers(response.data);
      } catch (error) {
        // Manejamos errores al obtener usuarios
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  // Función para alternar el rol de un usuario entre admin y user
  const handleToggleAdmin = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      // Buscamos el usuario por su ID
      const user = users.find((user) => user.id === userId);
      // Determinamos el nuevo rol
      const newRole = user.role === 'admin' ? 'user' : 'admin';

      // Realizamos la solicitud PATCH para actualizar el rol del usuario
      await axios.patch(
        `http://localhost:5000/api/roles/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Actualizamos el estado con el nuevo rol
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      // Manejamos errores al actualizar el rol
      console.error('Error al actualizar el rol del usuario:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border-b p-2">Email</th>
            <th className="border-b p-2">Role</th>
            <th className="border-b p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border-b p-2">{user.email}</td>
              <td className="border-b p-2">{user.role === 'admin' ? 'Admin' : 'User'}</td>
              <td className="border-b p-2">
                <button
                  onClick={() => handleToggleAdmin(user.id)}
                  className={`py-1 px-3 text-white rounded ${user.role === 'admin' ? 'bg-red-500' : 'bg-blue-500'
                    }`}
                >
                  {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;


