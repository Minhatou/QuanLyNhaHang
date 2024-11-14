import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [userInfo, setUserInfo] = useState({
        name: '',
        address: '',
        phone: '',
        city: '',
        state: ''
    });
    const storedUserId = localStorage.getItem('userID');
    const storedToken = localStorage.getItem('token');
    const storedUserRole = localStorage.getItem('role');
    const storedName = localStorage.getItem('name');

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`https://localhost:7001/api/ShoppingCart`, {
                    params: {
                        userId: storedUserId
                    },
                    headers: {
                        'Authorization': `Bearer ${storedToken}`
                    }
                });
                setCartItems(response.data.result.cartItems || []);
                setCartTotal(response.data.result.cartTotal || 0);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        if (storedUserId) {
            fetchCartItems();
        }
    }, [storedUserId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    };

    const handleRemoveFromCart = async (menuItemId) => {
        try {
            await axios.post(`https://localhost:7001/api/ShoppingCart`, null, {
                params: {
                    menuItemId: menuItemId,
                    updateQuantity: -1
                },
                headers: {
                    'Authorization': `Bearer ${storedToken}`
                }
            });
            const response = await axios.get(`https://localhost:7001/api/ShoppingCart`, {
                params: {
                    userId: storedUserId
                },
                headers: {
                    'Authorization': `Bearer ${storedToken}`
                }
            });
            setCartItems(response.data.result.cartItems || []);
            setCartTotal(response.data.result.cartTotal || 0);
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const handleAddToCart = async (menuItemId) => {
        try {
            await axios.post(`https://localhost:7001/api/ShoppingCart`, null, {
                params: {
                    menuItemId: menuItemId,
                    updateQuantity: 1
                },
                headers: {
                    'Authorization': `Bearer ${storedToken}`
                }
            });
            // Refresh cart items after addition
            const response = await axios.get(`https://localhost:7001/api/ShoppingCart`, {
                params: {
                    userId: storedUserId
                },
                headers: {
                    'Authorization': `Bearer ${storedToken}`
                }
            });
            setCartItems(response.data.result.cartItems || []);
            setCartTotal(response.data.result.cartTotal || 0);
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const handleConfirmTransaction = async () => {
        try {
            // Prepare the order payload
            const orderPayload = {
                applicationUserId: storedUserId,
                deliveryInfo: {
                    name: storedUserRole === 'table' ? storedName : userInfo.name,
                    phoneNumber: userInfo.phone,
                    streetAddress: userInfo.address,
                    city: userInfo.city,
                    state: userInfo.state
                },
            };

            // Post the order details to the order endpoint
            await axios.post(`https://localhost:7001/api/Order`, orderPayload, {
                headers: {
                    'Authorization': `Bearer ${storedToken}`
                }
            });

            // Notify the user
            alert('Transaction confirmed');

            // Refresh the page
            window.location.reload();
        } catch (error) {
            console.error('Error confirming transaction:', error);
        }
    };

    return (
        <div className="pt-32 pb-32 p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">Giỏ hàng</h1>
            <ul className="space-y-4">
                {cartItems.map(item => (
                    <li key={item.id} className="flex items-center justify-between p-4 bg-white shadow rounded-lg">
                        <div className="flex items-center">
                            <img src={item.menuItem.imageUrl} alt={item.menuItem.name} className="w-16 h-16 object-cover rounded mr-4" />
                            <div>
                                <h2 className="text-xl font-semibold">{item.menuItem.name}</h2>
                                <p className="text-gray-600">Số lượng: {item.quantity}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-bold">{item.menuItem.price}đ</p>
                            <button
                                onClick={() => handleRemoveFromCart(item.menuItem.id)}
                                className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                            >
                                -
                            </button>
                            <button
                                onClick={() => handleAddToCart(item.menuItem.id)}
                                className="mt-2 ml-2 px-4 py-2 bg-green-500 text-white rounded"
                            >
                                +
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="mt-6 text-right">
                <h2 className="text-2xl font-bold">Tổng tiền: {cartTotal}đ</h2>
            </div>
            {storedUserRole === 'customer' && (
                <form className="mt-6 space-y-4">
                    <div>
                        <label className="block text-gray-700">Tên</label>
                        <input
                            type="text"
                            name="name"
                            value={userInfo.name}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Địa chỉ</label>
                        <input
                            type="text"
                            name="address"
                            value={userInfo.address}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Số điện thoại</label>
                        <input
                            type="text"
                            name="phone"
                            value={userInfo.phone}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Thành phố</label>
                        <input
                            type="text"
                            name="city"
                            value={userInfo.city}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Bang</label>
                        <input
                            type="text"
                            name="state"
                            value={userInfo.state}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                </form>
            )}

            {storedUserRole === 'table' && (
                <form className="mt-6 space-y-4">
                    <div>
                        <label className="block text-gray-700">Tên</label>
                        <input
                            type="text"
                            name="name"
                            value={storedName}
                            readOnly
                            className="w-full p-2 border border-gray-300 rounded bg-gray-200"
                        />
                    </div>
                </form>
            )}
            <div className="mt-6 text-right">
                <button
                    onClick={handleConfirmTransaction}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Xác nhận thanh toán
                </button>
            </div>
        </div>
    );
};

export default Cart;