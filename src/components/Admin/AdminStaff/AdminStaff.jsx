import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StaffList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://localhost:7001/api/User');
                const staffAndAdmins = response.data.result.filter(user => user.role === 'staff' || user.role === 'admin');
                setUsers(staffAndAdmins);
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
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`https://localhost:7001/api/User/${userId}`);
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(users.length / itemsPerPage);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">Staff and Admin List</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-200">
                <tr>
                    <th className="py-2 px-4 border-b border-gray-300">Name</th>
                    <th className="py-2 px-4 border-b border-gray-300">Username</th>
                    <th className="py-2 px-4 border-b border-gray-300">Role</th>
                    <th className="py-2 px-4 border-b border-gray-300">Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map(user => (
                    <tr key={user.id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border-b border-gray-300">{user.name}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{user.userName}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{user.role}</td>
                        <td className="py-2 px-4 border-b border-gray-300">
                            <button
                                className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                onClick={() => handleEdit(user)}
                            >
                                Edit
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                onClick={() => handleRemove(user.id)}
                            >
                                Remove
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StaffList;