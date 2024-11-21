import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUserRoles = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const storedToken = localStorage.getItem('adminToken');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://localhost:7001/api/User', {
                    headers: {
                        'Authorization': `Bearer ${storedToken}`
                    }
                });
                setUsers(response.data.result);
            } catch (error) {
                setError('Error fetching users');
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [storedToken]);

    const handleRoleChange = async (userId, newRole) => {
        try {
            await axios.put(`https://localhost:7001/api/User/${userId}?role=${newRole}`, { id: userId, role: newRole }, {
                headers: {
                    'Authorization': `Bearer ${storedToken}`
                }
            });
            setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">Phân quyền</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Username</th>
                    <th className="py-2 px-4 border-b">Role</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td className="py-2 px-4 border-b">{user.name}</td>
                        <td className="py-2 px-4 border-b">{user.userName}</td>
                        <td className="py-2 px-4 border-b">
                            <select
                                value={user.role}
                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                className="p-2 border border-gray-300 rounded"
                            >
                                <option value="customer">Customer</option>
                                <option value="staff">Staff</option>
                                <option value="admin">Admin</option>
                                <option value="table">Table</option>
                            </select>
                        </td>
                        <td className="py-2 px-4 border-b">
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                                onClick={() => handleRoleChange(user.id, user.role)}
                            >
                                Save
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUserRoles;