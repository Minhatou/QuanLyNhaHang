import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory

const AdminNews = () => {
    const [newsList, setNewsList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newNews, setNewNews] = useState({ title: '', content: ''});
    const navigate = useNavigate(); // Use useNavigate hook

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/news-list');
                setNewsList(response.data);
            } catch (error) {
                console.error('Error fetching news list:', error);
            }
        };

        fetchNews();
    }, []);

    const handleEdit = (news) => {
        // Navigate to the edit page with the selected news ID
        navigate(`news/edit/${news._id}`);
    };

    const handleDelete = async (_id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this news item?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5000/api/admin/news/${id}`);
            setNewsList(newsList.filter(news => news._id !== _id));
        } catch (error) {
            console.error('Error deleting news:', error);
        }
    };

    const handleAddNews = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/admin/add-news', newNews);
            setNewNews({ title: '', content: '' });
            setShowForm(false);
            window.location.reload();
        } catch (error) {
            console.error('Error adding new news:', error);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Manage News</h1>
            <button
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? 'Cancel' : 'Add New News'}
            </button>
            {showForm && (
                <form onSubmit={handleAddNews} className="mb-4">
                    <div>
                        <label className="block mb-2">Title</label>
                        <input
                            type="text"
                            value={newNews.title}
                            onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                            className="border px-2 py-1"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Content</label>
                        <textarea
                            value={newNews.content}
                            onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                            className="border px-2 py-1"
                            required
                        />
                    </div>
                    <button type="submit" className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
                        Add News
                    </button>
                </form>
            )}
            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">Title</th>
                    <th className="py-2 px-4 border-b">Content</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                </tr>
                </thead>
                <tbody>
                {newsList.map(news => (
                    <tr key={news._id}>
                        <td className="py-2 px-4 border-b">{news._id}</td>
                        <td className="py-2 px-4 border-b">{news.title}</td>
                        <td className="py-2 px-4 border-b">{news.content}</td>
                        <td className="py-2 px-4 border-b">
                            <button
                                className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded"
                                onClick={() => handleEdit(news)}
                            >
                                Edit
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={() => handleDelete(news._id)}
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

export default AdminNews;
