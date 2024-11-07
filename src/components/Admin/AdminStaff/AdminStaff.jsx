import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminStaff = () => {
    const [staffs, setStaffs] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newStaff, setNewStaff] = useState({ name: '', email: '', role: '', password: '' });
    const [editStaff, setEditStaff] = useState(null);

    useEffect(() => {
        const fetchStaffs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/staffs-list');
                setStaffs(response.data);
            } catch (error) {
                console.error('Error fetching staff list:', error);
            }
        };

        fetchStaffs();
    }, []);

    const handleEdit = (staff) => {
        setEditStaff(staff);
        setShowForm(true);
    };

    const handleDelete = async (_id) => {
        const confirmDelete = window.confirm('Bạn có muốn xoá nhân viên này không?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5000/api/admin/staffs-list/${_id}`);
            setStaffs(staffs.filter(staff => staff._id !== _id));
        } catch (error) {
            console.error('Error deleting staff:', error);
        }
    };

    const handleAddStaff = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/admin/add-staff', newStaff);
            setNewStaff({ name: '', email: '', role: '', password: '' });
            setShowForm(false);
            window.location.reload();
        } catch (error) {
            console.error('Error adding new staff:', error);
        }
    };

    const handleUpdateStaff = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/admin/staffs-list/${editStaff._id}`, editStaff);
            setEditStaff(null);
            setShowForm(false);
            window.location.reload();
        } catch (error) {
            console.error('Error updating staff:', error);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Manage Staff</h1>
            <button
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? 'Cancel' : 'Add New Staff'}
            </button>
            {showForm && (
                <form onSubmit={editStaff ? handleUpdateStaff : handleAddStaff} className="mb-4">
                    <div>
                        <label className="block mb-2">Name</label>
                        <input
                            type="text"
                            value={editStaff ? editStaff.name : newStaff.name}
                            onChange={(e) => editStaff ? setEditStaff({ ...editStaff, name: e.target.value }) : setNewStaff({ ...newStaff, name: e.target.value })}
                            className="border px-2 py-1"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Email</label>
                        <input
                            type="email"
                            value={editStaff ? editStaff.email : newStaff.email}
                            onChange={(e) => editStaff ? setEditStaff({ ...editStaff, email: e.target.value }) : setNewStaff({ ...newStaff, email: e.target.value })}
                            className="border px-2 py-1"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Role</label>
                        <input
                            type="text"
                            value={editStaff ? editStaff.role : newStaff.role}
                            onChange={(e) => editStaff ? setEditStaff({ ...editStaff, role: e.target.value }) : setNewStaff({ ...newStaff, role: e.target.value })}
                            className="border px-2 py-1"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Password</label>
                        <input
                            type="password"
                            value={editStaff ? editStaff.password : newStaff.password}
                            onChange={(e) => editStaff ? setEditStaff({ ...editStaff, password: e.target.value }) : setNewStaff({ ...newStaff, password: e.target.value })}
                            className="border px-2 py-1"
                            required
                        />
                    </div>
                    <button type="submit" className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
                        {editStaff ? 'Update Staff' : 'Add Staff'}
                    </button>
                </form>
            )}
            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Role</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                </tr>
                </thead>
                <tbody>
                {staffs.map(staff => (
                    <tr key={staff._id}>
                        <td className="py-2 px-4 border-b">{staff._id}</td>
                        <td className="py-2 px-4 border-b">{staff.name}</td>
                        <td className="py-2 px-4 border-b">{staff.email}</td>
                        <td className="py-2 px-4 border-b">{staff.role}</td>
                        <td className="py-2 px-4 border-b">
                            <button
                                className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded"
                                onClick={() => handleEdit(staff)}
                            >
                                Edit
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={() => handleDelete(staff._id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminStaff;