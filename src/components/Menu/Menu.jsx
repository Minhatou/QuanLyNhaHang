import React, { useState, useEffect } from 'react';
import axios from "axios";

const Menu = () => {
    const [categories, setCategories] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [menuItems, setMenuItems] = useState([]);
    const [currentImage, setCurrentImage] = useState('/images/menuitem/spring roll.jpg');
    const [notification, setNotification] = useState('');
    const storedUserId = localStorage.getItem('userID');

    useEffect(() => {
        fetch('https://localhost:7001/api/Category')
            .then(response => response.json())
            .then(data => {
                if (data.isSuccess && Array.isArray(data.result.$values)) {
                    setCategories(data.result.$values);
                    if (data.result.$values.length > 0) {
                        setSelectedType(data.result.$values[0].id);
                        fetchMenuItems(data.result.$values[0].id);
                    }
                } else {
                    console.error('API response is not in the expected format:', data);
                }
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const fetchMenuItems = (categoryId) => {
        fetch(`https://localhost:7001/api/MenuItem?categoryId=${categoryId}`)
            .then(response => response.json())
            .then(data => {
                if (data.isSuccess && Array.isArray(data.result.$values)) {
                    setMenuItems(data.result.$values);
                } else {
                    console.error('API response is not in the expected format:', data);
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
            await axios.post(`https://localhost:7001/api/ShoppingCart`, null, {
                params: {
                    userId: storedUserId,
                    menuItemId: menuItemId,
                    updateQuantityBy: 1
                }
            });
            setNotification(`Đã thêm "${menuItemName}" vào giỏ hàng`);
            setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    return (
        <section id="menu" className="h-screen p-12 flex flex-col items-center justify-center text-left">
            <div className="w-full p-5 rounded-lg">
                <h2 className="text-3xl text-gray-900 font-bold mb-5">THỰC ĐƠN</h2>
                <div className="flex gap-5 mb-5">
                    {Array.isArray(categories) && categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.id)}
                            className={`p-3 rounded-lg ${selectedType === category.id ? 'bg-gray-200' : 'hover:bg-gray-200'} cursor-pointer`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
                <div className="flex w-full h-[480px]">
                    <div className="w-2/5 p-5 rounded-lg">
                        <div className="flex flex-col gap-5">
                            {menuItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="p-3 rounded-lg hover:bg-gray-200 cursor-pointer"
                                    onMouseEnter={() => {
                                        setCurrentImage(`${item.imageUrl.replace(/\\/g, '/')}`);
                                        console.log(`Hovered over image: ${item.imageUrl.replace(/\\/g, '/')}`);
                                    }}
                                >
                                    <h3 className="text-xl font-semibold">{item.name}</h3>
                                    <p className="text-sm text-gray-500">{item.description}</p>
                                    <p className="text-lg font-semibold">{item.price}đ</p>
                                    <button
                                        onClick={() => handleAddToCart(item.id, item.name)}
                                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                                    >
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-3/5 flex items-center justify-center">
                        <img src={currentImage} alt="Menu" className="w-full h-full object-cover rounded-lg"/>
                    </div>
                </div>
                {notification && (
                    <div className="fixed bottom-32 right-4 bg-green-500 text-white p-3 rounded">
                        {notification}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Menu;