import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [userInfo, setUserInfo] = useState({
        name: '',
        address: '',
        phone: '',
    });
    const storedUserId = localStorage.getItem('userID');

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`https://localhost:7001/api/ShoppingCart?userId=${storedUserId}`);
                setCartItems(response.data.result.cartItems.$values || []);
                setCartTotal(response.data.result.cartTotal || 0);
                setUserInfo({
                    ...userInfo,
                    name: response.data.result.applicationUser.name || '',
                    phone: response.data.result.applicationUser.phoneNumber || ''
                });
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
                    userId: storedUserId,
                    menuItemId: menuItemId,
                    updateQuantityBy: -1
                }
            });
            const response = await axios.get(`https://localhost:7001/api/ShoppingCart?userId=${storedUserId}`);
            setCartItems(response.data.result.cartItems.$values || []);
            setCartTotal(response.data.result.cartTotal || 0);
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const handleAddToCart = async (menuItemId) => {
        try {
            await axios.post(`https://localhost:7001/api/ShoppingCart`, null, {
                params: {
                    userId: storedUserId,
                    menuItemId: menuItemId,
                    updateQuantityBy: 1
                }
            });
            // Refresh cart items after addition
            const response = await axios.get(`https://localhost:7001/api/ShoppingCart?userId=${storedUserId}`);
            setCartItems(response.data.result.cartItems.$values || []);
            setCartTotal(response.data.result.cartTotal || 0);
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const handleConfirmTransaction = async () => {
        try {
            // Fetch the cart data again
            const response = await axios.get(`https://localhost:7001/api/ShoppingCart?userId=${storedUserId}`);
            const cartData = response.data.result;

            // Prepare the order payload
            const orderPayload = {
                applicationUserId: cartData.applicationUser.id,
                orderTotal: cartData.cartTotal,
                itemTotal: 0,
                paymentIntentId: "0",
                orderStatus: "Đã thanh toán",
                email: cartData.applicationUser.email,
                name: cartData.applicationUser.name,
                phoneNumber: cartData.applicationUser.phoneNumber,
                streetAddress: cartData.applicationUser.streetAddress,
                city: cartData.applicationUser.city,
                state: cartData.applicationUser.state,
                orderDetail: cartData.cartItems.$values.map(item => ({
                    menuItemId: item.menuItem.id,
                    quantity: item.quantity,
                    price: item.menuItem.price
                }))
            };

            // Post the order details to the order endpoint
            await axios.post(`https://localhost:7001/api/Order`, orderPayload);
            console.log('Transaction confirmed');
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
                        <div>
                            <h2 className="text-xl font-semibold">{item.menuItem.name}</h2>
                            <p className="text-gray-600">Số lượng: {item.quantity}</p>
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
            <form className="mt-6 space-y-4">
                <div>
                    <label className="block text-gray-700">Tên</label>
                    <input
                        type="text"
                        name="name"
                        value={userInfo.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
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
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Số điên thoại</label>
                    <input
                        type="text"
                        name="phone"
                        value={userInfo.phone}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
            </form>
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