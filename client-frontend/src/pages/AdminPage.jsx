import React, { useEffect, useState } from 'react';

// Simulando un almacenamiento de usuarios
const usersDB = [
  { id: 1, email: 'user1@example.com', isAdmin: false },
  { id: 2, email: 'user2@example.com', isAdmin: false },
  { id: 3, email: 'proyectoBioBlog@gmail.com', isAdmin: true }, 
];

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  // Simulando la carga de usuarios
  useEffect(() => {
    // Aquí deberías realizar una llamada a la API para obtener los usuarios
    setUsers(usersDB);
  }, []);

  const handleToggleAdmin = (userId) => {
    // Cambia el estado de administrador del usuario
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isAdmin: !user.isAdmin } : user
      )
    );
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
              <td className="border-b p-2">{user.isAdmin ? 'Admin' : 'User'}</td>
              <td className="border-b p-2">
                <button
                  onClick={() => handleToggleAdmin(user.id)}
                  className={`py-1 px-3 text-white rounded ${
                    user.isAdmin ? 'bg-red-500' : 'bg-blue-500'
                  }`}
                >
                  {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
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

