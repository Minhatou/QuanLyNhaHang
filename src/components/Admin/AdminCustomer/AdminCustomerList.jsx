import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://localhost:7001/api/User');
                const customers = response.data.result.filter(user => user.role === 'customer');
                setUsers(customers);
            } catch (error) {
                setError('Error fetching users');
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleEdit = (user) => {
        // Implement edit functionality here
        console.log('Edit user:', user);
    };

    const handleRemove = async (userId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this customer?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`https://localhost:7001/api/User/${userId}`);
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">Customer List</h1>
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
                        <td className="py-2 px-4 border-b">{user.role}</td>
                        <td className="py-2 px-4 border-b">
                            <button
                                className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded"
                                onClick={() => handleEdit(user)}
                            >
                                Edit
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={() => handleRemove(user.id)}
                            >
                                Remove
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerList;