import React from 'react';

const AdminCustomer = () => {
    const customers = [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', date: '2023-10-01' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', date: '2023-10-02' },
        // Add more customers here
    ];

    const handleEdit = (id) => {
        console.log(`Edit customer with id: ${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Delete customer with id: ${id}`);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Manage Customers</h1>
            <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Add New Customer</button>
            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Date</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                </tr>
                </thead>
                <tbody>
                {customers.map(customer => (
                    <tr key={customer.id}>
                        <td className="py-2 px-4 border-b">{customer.id}</td>
                        <td className="py-2 px-4 border-b">{customer.name}</td>
                        <td className="py-2 px-4 border-b">{customer.email}</td>
                        <td className="py-2 px-4 border-b">{customer.date}</td>
                        <td className="py-2 px-4 border-b">
                            <button
                                className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded"
                                onClick={() => handleEdit(customer.id)}
                            >
                                Edit
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={() => handleDelete(customer.id)}
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

export default AdminCustomer;