import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrder = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const storedToken = localStorage.getItem('token');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://localhost:7001/api/Order', {
                    headers: {
                        'Authorization': `Bearer ${storedToken}`
                    }
                });
                setOrders(response.data.result || []);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [storedToken]);

    const fetchOrderDetails = async (orderId) => {
        try {
            const response = await axios.get(`https://localhost:7001/api/order/${orderId}`, {
                headers: {
                    'Authorization': `Bearer ${storedToken}`
                }
            });
            setSelectedOrder(response.data.result);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
        setError(null); // Clear any errors when closing the modal
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">Order List</h1>
            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">Order ID</th>
                    <th className="py-2 px-4 border-b">Customer Name</th>
                    <th className="py-2 px-4 border-b">Total</th>
                    <th className="py-2 px-4 border-b">Status</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => (
                    <tr key={order.id}>
                        <td className="py-2 px-4 border-b">{order.id}</td>
                        <td className="py-2 px-4 border-b">{order.name}</td>
                        <td className="py-2 px-4 border-b">{order.orderTotal}</td>
                        <td className="py-2 px-4 border-b">{order.orderStatus}</td>
                        <td className="py-2 px-4 border-b">
                            <button
                                onClick={() => fetchOrderDetails(order.id)}
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                            >
                                View Details
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {isModalOpen && selectedOrder && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg w-2/3">
                        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                        <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                        <p><strong>Name:</strong> {selectedOrder.name}</p>
                        <p><strong>Phone Number:</strong> {selectedOrder.phoneNumber}</p>
                        <h3 className="text-xl font-bold mt-4">Order Items</h3>
                        <table className="min-w-full bg-white mt-2">
                            <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Item ID</th>
                                <th className="py-2 px-4 border-b">Item Name</th>
                                <th className="py-2 px-4 border-b">Quantity</th>
                                <th className="py-2 px-4 border-b">Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {selectedOrder.orderDetail.map(item => (
                                <tr key={item.menuItemId}>
                                    <td className="py-2 px-4 border-b">{item.menuItemId}</td>
                                    <td className="py-2 px-4 border-b">{item.menuItem.name}</td>
                                    <td className="py-2 px-4 border-b">{item.quantity}</td>
                                    <td className="py-2 px-4 border-b">{item.price}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <button
                            onClick={closeModal}
                            className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {error && (
                <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}
        </div>
    );
};

export default AdminOrder;