import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotificationPopup from '../../NotificationPopup.jsx';

const Order = () => {
    const [categories, setCategories] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [menuItems, setMenuItems] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const storedUserId = localStorage.getItem('userID');
    const storedToken = localStorage.getItem('token');

    useEffect(() => {
        axios.get('https://localhost:7001/api/Category')
            .then(response => {
                if (response.data.isSuccess && Array.isArray(response.data.result)) {
                    setCategories(response.data.result);
                    if (response.data.result.length > 0) {
                        setSelectedType(response.data.result[0].id);
                        fetchMenuItems(response.data.result[0].id);
                    }
                } else {
                    console.error('API response is not in the expected format:', response.data);
                }
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const fetchMenuItems = (categoryId) => {
        axios.get(`https://localhost:7001/api/MenuItem/Category/${categoryId}`)
            .then(response => {
                if (response.data.isSuccess && Array.isArray(response.data.result)) {
                    setMenuItems(response.data.result);
                } else {
                    console.error('API response is not in the expected format:', response.data);
                }
            })
            .catch(error => console.error('Error fetching menu items:', error));
    };

    const handleCategoryClick = (categoryId) => {
        setSelectedType(categoryId);
        fetchMenuItems(categoryId);
    };

    const handleAddToCart = async (menuItemId, menuItemName) => {
        try {
            await axios.post('https://localhost:7001/api/ShoppingCart', null, {
                params: {
                    menuItemId: menuItemId,
                    updateQuantity: 1
                },
                headers: {
                    'Authorization': `Bearer ${storedToken}`
                }
            });
            setPopupMessage(`Successfully added "${menuItemName}" to the cart`);
            setShowPopup(true);
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const closePopup = () => {
        setShowPopup(false);
        setPopupMessage('');
    };

    return (
        <section id="order" className="p-12 md:p-20 flex flex-col items-center justify-center text-left">
            <div className="w-full p-5 rounded-lg bg-white shadow">
                <h2 className="text-2xl md:text-3xl text-gray-900 font-bold mb-5">Order</h2>
                <div className="flex flex-wrap gap-2 md:gap-5 mb-5">
                    {Array.isArray(categories) && categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.id)}
                            className={`p-2 md:p-3 rounded-lg ${selectedType === category.id ? 'bg-gray-200' : 'hover:bg-gray-200'} cursor-pointer`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {menuItems.map((item) => (
                        <div key={item.id} className="p-4 border rounded-lg flex flex-col items-center">
                            <img src={item.imageUrl.replace(/\\/g, '/')} alt={item.name} className="w-full h-48 object-cover rounded-lg mb-4"/>
                            <h3 className="text-lg md:text-xl font-semibold">{item.name}</h3>
                            <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                            <p className="text-lg font-semibold mb-4">{item.price}đ</p>
                            {storedUserId && (
                                <button
                                    onClick={() => handleAddToCart(item.id, item.name)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded"
                                >
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {showPopup && (
                <NotificationPopup message={popupMessage} onClose={closePopup} />
            )}
        </section>
    );
};

export default Order;