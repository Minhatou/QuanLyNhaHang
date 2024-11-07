import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminNews = () => {
    const [newsList, setNewsList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newNews, setNewNews] = useState({ title: '', content: ''});
    const [editNews, setEditNews] = useState(null);

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
        setEditNews(news);
        setShowForm(true);
    };

    const handleDelete = async (_id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this news item?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5000/api/admin/news-list/${_id}`);
            setNewsList(newsList.filter(news => news._id !== _id));
        } catch (error) {
            console.error('Error deleting news:', error);
        }
    };

    const handleAddNews = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/admin/add-news', newNews);
            setNewNews({ title: '', content: '', author: '' });
            setShowForm(false);
            window.location.reload();
        } catch (error) {
            console.error('Error adding new news:', error);
        }
    };

    const handleUpdateNews = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/admin/news-list/${editNews._id}`, editNews);
            setEditNews(null);
            setShowForm(false);
            window.location.reload();
        } catch (error) {
            console.error('Error updating news:', error);
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
                <form onSubmit={editNews ? handleUpdateNews : handleAddNews} className="mb-4">
                    <div>
                        <label className="block mb-2">Title</label>
                        <input
                            type="text"
                            value={editNews ? editNews.title : newNews.title}
                            onChange={(e) => editNews ? setEditNews({ ...editNews, title: e.target.value }) : setNewNews({ ...newNews, title: e.target.value })}
                            className="border px-2 py-1"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Content</label>
                        <textarea
                            value={editNews ? editNews.content : newNews.content}
                            onChange={(e) => editNews ? setEditNews({ ...editNews, content: e.target.value }) : setNewNews({ ...newNews, content: e.target.value })}
                            className="border px-2 py-1"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Author</label>
                        <input
                            type="text"
                            value={editNews ? editNews.author : newNews.author}
                            onChange={(e) => editNews ? setEditNews({ ...editNews, author: e.target.value }) : setNewNews({ ...newNews, author: e.target.value })}
                            className="border px-2 py-1"
                            required
                        />
                    </div>
                    <button type="submit" className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
                        {editNews ? 'Update News' : 'Add News'}
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