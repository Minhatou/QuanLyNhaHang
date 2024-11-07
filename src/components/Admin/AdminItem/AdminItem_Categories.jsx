import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminItem_Categories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });
    const [showForm, setShowForm] = useState(false);
    const [editCategory, setEditCategory] = useState(null); // State to manage the category being edited

    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://localhost:7001/api/Category');
            setCategories(response.data.result.$values || []); // Adjust based on the actual API response structure
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editCategory) {
            setEditCategory({ ...editCategory, [name]: value });
        } else {
            setNewCategory({ ...newCategory, [name]: value });
        }
    };

    const handleAddCategory = async () => {
        const formData = new FormData();
        formData.append('name', newCategory.name);
        formData.append('description', newCategory.description);

        try {
            const response = await axios.post('https://localhost:7001/api/Category', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Category added:', response.data);
            setNewCategory({ name: '', description: '' });
            setShowForm(false);
            fetchCategories(); // Refresh the categories list
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleEdit = (category) => {
        setEditCategory(category);
        setShowForm(true);
    };

    const handleUpdateCategory = async () => {
        const formData = new FormData();
        formData.append('id', editCategory.id);
        formData.append('name', editCategory.name);
        formData.append('description', editCategory.description);

        try {
            const response = await axios.put(`https://localhost:7001/api/Category/${editCategory.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Category updated:', response.data);
            setEditCategory(null);
            setShowForm(false);
            fetchCategories(); // Refresh the categories list
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:7001/api/Category/${id}`);
            console.log('Category deleted');
            fetchCategories(); // Refresh the categories list
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Danh mục mặt hàng</h1>
            <button
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => setShowForm(true)}
            >
                Add Category
            </button>
            {showForm && (
                <div className="mb-4">
                    {editCategory && (
                        <input
                            type="text"
                            className="px-4 py-2 border rounded"
                            placeholder="ID"
                            name="id"
                            value={editCategory.id}
                            onChange={handleInputChange}
                            readOnly
                        />
                    )}
                    <input
                        type="text"
                        className="px-4 py-2 border rounded mt-2"
                        placeholder="Category Name"
                        name="name"
                        value={editCategory ? editCategory.name : newCategory.name}
                        onChange={handleInputChange}
                    />
                    <textarea
                        className="px-4 py-2 border rounded mt-2"
                        placeholder="Category Description"
                        name="description"
                        value={editCategory ? editCategory.description : newCategory.description}
                        onChange={handleInputChange}
                    />
                    <button
                        className="ml-2 px-4 py-2 bg-green-500 text-white rounded"
                        onClick={editCategory ? handleUpdateCategory : handleAddCategory}
                    >
                        {editCategory ? 'Update' : 'Save'}
                    </button>
                    <button
                        className="ml-2 px-4 py-2 bg-gray-500 text-white rounded"
                        onClick={() => {
                            setShowForm(false);
                            setEditCategory(null);
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
                {Array.isArray(categories) && categories.map((category) => (
                    <tr key={category.id}>
                        <td className="py-2 px-4 border-b">{category.id}</td>
                        <td className="py-2 px-4 border-b">{category.name}</td>
                        <td className="py-2 px-4 border-b">
                            <button
                                className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded"
                                onClick={() => handleEdit(category)}
                            >
                                Edit
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={() => handleDelete(category.id)}
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

export default AdminItem_Categories;