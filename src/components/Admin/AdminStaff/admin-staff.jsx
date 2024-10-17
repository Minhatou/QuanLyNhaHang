import React from 'react';

const AdminStaff = () => {
    const staff = [
        { id: 1, name: 'John Doe', position: 'Manager', date: '2023-10-01' },
        { id: 2, name: 'Jane Smith', position: 'Chef', date: '2023-10-02' },
        // Add more staff members here
    ];

    const handleEdit = (id) => {
        console.log(`Edit staff member with id: ${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Delete staff member with id: ${id}`);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Manage Staff</h1>
            <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Add New Staff</button>
            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Position</th>
                    <th className="py-2 px-4 border-b">Date</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                </tr>
                </thead>
                <tbody>
                {staff.map(member => (
                    <tr key={member.id}>
                        <td className="py-2 px-4 border-b">{member.id}</td>
                        <td className="py-2 px-4 border-b">{member.name}</td>
                        <td className="py-2 px-4 border-b">{member.position}</td>
                        <td className="py-2 px-4 border-b">{member.date}</td>
                        <td className="py-2 px-4 border-b">
                            <button
                                className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded"
                                onClick={() => handleEdit(member.id)}
                            >
                                Edit
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={() => handleDelete(member.id)}
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