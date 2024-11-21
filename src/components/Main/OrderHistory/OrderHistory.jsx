import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const storedUserId = localStorage.getItem('userID');
    const storedToken = localStorage.getItem('token');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://localhost:7001/api/Order', {
                    headers: {
                        'Authorization': `Bearer ${storedToken}`
                    }
                });
                console.log(response.data); // Log the response data to understand its structure
                const userOrders = Array.isArray(response.data.result) ? response.data.result.filter(order => order.applicationUserId === storedUserId) : [];
                setOrders(userOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        if (storedUserId) {
            fetchOrders();
        }
    }, [storedUserId, storedToken]);

    const openModal = async (orderId) => {
        try {
            const response = await axios.get(`https://localhost:7001/api/Order/${orderId}`, {
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
    };

    return (
        <div className="pt-32 pb-32 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Lịch sử đặt hàng</h1>
            <ul className="space-y-4">
                {orders.map(order => (
                    <li key={order.id} className="p-4 bg-white shadow rounded-lg">
                        <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
                        <p className="text-gray-600">Total: {order.orderTotal}đ</p>
                        <p className="text-gray-600">Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                        <button
                            onClick={() => openModal(order.id)}
                            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                            Xem chi tiết
                        </button>
                    </li>
                ))}
            </ul>

            {isModalOpen && selectedOrder && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg w-2/3">
                        <h2 className="text-2xl font-bold mb-4">Chi tiết đơn hàng</h2>
                        <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                        <p><strong>Total:</strong> {selectedOrder.orderTotal}đ</p>
                        <p><strong>Date:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
                        <h3 className="text-xl font-bold mt-4">Order Items</h3>
                        <table className="min-w-full bg-white mt-2">
                            <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Item ID</th>
                                <th className="py-2 px-4 border-b">Item Name</th>
                                <th className="py-2 px-4 border-b">Image</th>
                                <th className="py-2 px-4 border-b">Quantity</th>
                                <th className="py-2 px-4 border-b">Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {selectedOrder.orderDetail.map(item => (
                                <tr key={item.menuItemId}>
                                    <td className="py-2 px-4 border-b">{item.menuItemId}</td>
                                    <td className="py-2 px-4 border-b">{item.menuItem.name}</td>
                                    <td className="py-2 px-4 border-b">
                                        {item.menuItem.imageUrl && <img src={item.menuItem.imageUrl} alt={item.menuItem.name}
                                                                     className="w-16 h-16 object-cover"/>}
                                    </td>
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
        </div>
    );
};

export default OrderHistory;