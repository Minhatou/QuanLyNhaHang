import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ConfirmationModal from '../ConfirmationModal'; // Import the ConfirmationModal component

const StaffList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [showConfirm, setShowConfirm] = useState(false);
    //const [userToDelete, setUserToDelete] = useState(null);
    const [editUser, setEditUser] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);

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
        setEditUser(user);
        setShowEditForm(true);
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

            <ConfirmationModal
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={() => {}}
                message=""
            />

            {showEditForm && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                        <h2 className="text-2xl font-bold mb-4">Edit User</h2>
                        <input
                            type="text"
                            className="px-4 py-2 border rounded mt-2 w-full"
                            placeholder="Name"
                            value={editUser.name}
                            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                        />
                        <input
                            type="text"
                            className="px-4 py-2 border rounded mt-2 w-full"
                            placeholder="Username"
                            value={editUser.userName}
                            onChange={(e) => setEditUser({ ...editUser, userName: e.target.value })}
                        />
                        <select
                            className="px-4 py-2 border rounded mt-2 w-full"
                            value={editUser.role}
                            onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                        >
                            <option value="staff">Staff</option>
                            <option value="admin">Admin</option>
                        </select>
                        <div className="flex justify-end mt-4">
                            <button
                                className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                                onClick={() => setShowEditForm(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded"
                                onClick={() => {
                                    // Implement save functionality here
                                    setShowEditForm(false);
                                }}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaffList;