import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminItem = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [newItem, setNewItem] = useState({
        id: '',
        categoryId: '',
        description: '',
        name: '',
        price: '',
        specialTag: '',
        image: null
    });
    const [showForm, setShowForm] = useState(false);
    const [editItem, setEditItem] = useState(null); // State to manage the item being edited
    const storedToken = localStorage.getItem('token');

    const fetchMenuItems = async () => {
        try {
            const response = await axios.get('https://localhost:7001/api/MenuItem', {
                headers: {
                    'Authorization': `Bearer ${storedToken}`
                }
            });
            setMenuItems(response.data.result || []);
        } catch (error) {
            console.error('Error fetching menu items:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editItem) {
            setEditItem({ ...editItem, [name]: value });
        } else {
            setNewItem({ ...newItem, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log('Selected file:', file.name); // Log the file name
        if (editItem) {
            setEditItem({ ...editItem, image: file });
        } else {
            setNewItem({ ...newItem, image: file });
        }
    };

    const handleAddItem = async () => {
        const formData = new FormData();
        formData.append('categoryId', newItem.categoryId);
        formData.append('description', newItem.description);
        formData.append('name', newItem.name);
        formData.append('price', newItem.price);
        formData.append('specialTag', newItem.specialTag);
        formData.append('image', newItem.image);

        try {
            const response = await axios.post('https://localhost:7001/api/MenuItem', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${storedToken}`
                },
            });
            console.log('Menu item added:', response.data);
            setNewItem({
                categoryId: '',
                description: '',
                name: '',
                price: '',
                specialTag: '',
                image: null
            });
            setShowForm(false);
            fetchMenuItems();
        } catch (error) {
            console.error('Error adding menu item:', error);
        }
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setShowForm(true);
    };

    const handleUpdateItem = async () => {
        const formData = new FormData();
        formData.append('id', editItem.id);
        formData.append('categoryId', editItem.categoryId);
        formData.append('description', editItem.description);
        formData.append('name', editItem.name);
        formData.append('price', editItem.price);
        formData.append('specialTag', editItem.specialTag);
        formData.append('image', editItem.image);

        try {
            const response = await axios.put(`https://localhost:7001/api/MenuItem/${editItem.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${storedToken}`
                },
            });
            console.log('Menu item updated:', response.data);
            setEditItem(null);
            setShowForm(false);
            fetchMenuItems();
        } catch (error) {
            console.error('Error updating menu item:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:7001/api/MenuItem/${id}`, {
                headers: {
                    'Authorization': `Bearer ${storedToken}`
                }
            });
            console.log('Menu item deleted');
            fetchMenuItems();
        } catch (error) {
            console.error('Error deleting menu item:', error);
        }
    };

    useEffect(() => {
        fetchMenuItems();
    }, []);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Danh sách mặt hàng</h1>
            <button
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => setShowForm(true)}
            >
                Add Item
            </button>
            {showForm && (
                <div className="mb-4">
                    {!editItem && (
                        <>
                            <input
                                type="text"
                                className="px-4 py-2 border rounded mt-2"
                                placeholder="Category ID"
                                name="categoryId"
                                value={newItem.categoryId}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                className="px-4 py-2 border rounded mt-2"
                                placeholder="Item Name"
                                name="name"
                                value={newItem.name}
                                onChange={handleInputChange}
                            />
                            <textarea
                                className="px-4 py-2 border rounded mt-2"
                                placeholder="Description"
                                name="description"
                                value={newItem.description}
                                onChange={handleInputChange}
                            />
                            <input
                                type="file"
                                className="px-4 py-2 border rounded mt-2"
                                onChange={handleFileChange}
                            />
                            <input
                                type="number"
                                className="px-4 py-2 border rounded mt-2"
                                placeholder="Price"
                                name="price"
                                value={newItem.price}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                className="px-4 py-2 border rounded mt-2"
                                placeholder="Special Tag"
                                name="specialTag"
                                value={newItem.specialTag}
                                onChange={handleInputChange}
                            />
                        </>
                    )}
                    {editItem && (
                        <>
                            <input
                                type="text"
                                className="px-4 py-2 border rounded"
                                placeholder="ID"
                                name="id"
                                value={editItem.id}
                                onChange={handleInputChange}
                                readOnly
                            />
                            <input
                                type="text"
                                className="px-4 py-2 border rounded mt-2"
                                placeholder="Category ID"
                                name="categoryId"
                                value={editItem.categoryId}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                className="px-4 py-2 border rounded mt-2"
                                placeholder="Item Name"
                                name="name"
                                value={editItem.name}
                                onChange={handleInputChange}
                            />
                            <textarea
                                className="px-4 py-2 border rounded mt-2"
                                placeholder="Description"
                                name="description"
                                value={editItem.description}
                                onChange={handleInputChange}
                            />
                            <input
                                type="file"
                                className="px-4 py-2 border rounded mt-2"
                                onChange={handleFileChange}
                            />
                            <input
                                type="number"
                                className="px-4 py-2 border rounded mt-2"
                                placeholder="Price"
                                name="price"
                                value={editItem.price}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                className="px-4 py-2 border rounded mt-2"
                                placeholder="Special Tag"
                                name="specialTag"
                                value={editItem.specialTag}
                                onChange={handleInputChange}
                            />
                        </>
                    )}
                    <button
                        className="ml-2 px-4 py-2 bg-green-500 text-white rounded mt-2"
                        onClick={editItem ? handleUpdateItem : handleAddItem}
                    >
                        {editItem ? 'Update' : 'Save'}
                    </button>
                    <button
                        className="ml-2 px-4 py-2 bg-gray-500 text-white rounded mt-2"
                        onClick={() => {
                            setShowForm(false);
                            setEditItem(null);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            )}
            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                </tr>
                </thead>
                <tbody>
                {Array.isArray(menuItems) && menuItems.map((item) => (
                    <tr key={item.id}>
                        <td className="py-2 px-4 border-b">{item.id}</td>
                        <td className="py-2 px-4 border-b">{item.name}</td>
                        <td className="py-2 px-4 border-b">
                            <button
                                className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded"
                                onClick={() => handleEdit(item)}
                            >
                                Edit
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={() => handleDelete(item.id)}
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

export default AdminItem;