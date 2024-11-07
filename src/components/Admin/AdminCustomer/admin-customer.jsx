import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminCustomer = () => {
    const [customers, setCustomers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '', address: '' });
    const [editCustomer, setEditCustomer] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/users-list');
                setCustomers(response.data);
            } catch (error) {
                console.error('Error fetching user list:', error);
            }
        };

        fetchCustomers();
    }, []);

    const handleEdit = (customer) => {
        setEditCustomer(customer);
        setShowForm(true);
    };

    const handleDelete = async (_id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this customer?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5000/api/admin/users-list/${_id}`);
            setCustomers(customers.filter(customer => customer._id !== _id));
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    const handleAddCustomer = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/admin/add-customer', newCustomer);
            setNewCustomer({ name: '', email: '', phone: '', address: '' });
            setShowForm(false);
            window.location.reload();
        } catch (error) {
            console.error('Error adding new customer:', error);
        }
    };

    const handleUpdateCustomer = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/admin/customers-list/${editCustomer._id}`, editCustomer);
            setEditCustomer(null);
            setShowForm(false);
            window.location.reload();
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Manage Customers</h1>
            <button
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? 'Cancel' : 'Add New Customer'}
            </button>
            {showForm && (
                <form onSubmit={editCustomer ? handleUpdateCustomer : handleAddCustomer} className="mb-4">
                    <div>
                        <label className="block mb-2">Name</label>
                        <input
                            type="text"
                            value={editCustomer ? editCustomer.name : newCustomer.name}
                            onChange={(e) => editCustomer ? setEditCustomer({ ...editCustomer, name: e.target.value }) : setNewCustomer({ ...newCustomer, name: e.target.value })}
                            className="border px-2 py-1"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Email</label>
                        <input
                            type="email"
                            value={editCustomer ? editCustomer.email : newCustomer.email}
                            onChange={(e) => editCustomer ? setEditCustomer({ ...editCustomer, email: e.target.value }) : setNewCustomer({ ...newCustomer, email: e.target.value })}
                            className="border px-2 py-1"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Phone</label>
                        <input
                            type="text"
                            value={editCustomer ? editCustomer.phone : newCustomer.phone}
                            onChange={(e) => editCustomer ? setEditCustomer({ ...editCustomer, phone: e.target.value }) : setNewCustomer({ ...newCustomer, phone: e.target.value })}
                            className="border px-2 py-1"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Address</label>
                        <input
                            type="text"
                            value={editCustomer ? editCustomer.address : newCustomer.address}
                            onChange={(e) => editCustomer ? setEditCustomer({ ...editCustomer, address: e.target.value }) : setNewCustomer({ ...newCustomer, address: e.target.value })}
                            className="border px-2 py-1"
                            required
                        />
                    </div>
                    <button type="submit" className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
                        {editCustomer ? 'Update Customer' : 'Add Customer'}
                    </button>
                </form>
            )}
            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Phone</th>
                    <th className="py-2 px-4 border-b">Address</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                </tr>
                </thead>
                <tbody>
                {customers.map(customer => (
                    <tr key={customer._id}>
                        <td className="py-2 px-4 border-b">{customer._id}</td>
                        <td className="py-2 px-4 border-b">{customer.name}</td>
                        <td className="py-2 px-4 border-b">{customer.email}</td>
                        <td className="py-2 px-4 border-b">{customer.phone}</td>
                        <td className="py-2 px-4 border-b">{customer.address}</td>
                        <td className="py-2 px-4 border-b">
                            <button
                                className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded"
                                onClick={() => handleEdit(customer)}
                            >
                                Edit
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={() => handleDelete(customer._id)}
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