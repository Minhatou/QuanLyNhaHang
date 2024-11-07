import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditNews = () => {
    const { _id } = useParams();
    const navigate = useNavigate();
    const [news, setNews] = useState({ title: '', content: '' });

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/news/${_id}`);
                setNews(response.data);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, [_id]);

    const handleUpdateNews = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/admin/news/${_id}`, news);
            navigate('/admin/dashboard/news-list');
        } catch (error) {
            console.error('Error updating news:', error);
        }
    };
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Edit News</h1>
            <form onSubmit={handleUpdateNews} className="mb-4">
                <div>
                    <label className="block mb-2">Title</label>
                    <input
                        type="text"
                        value={news.title}
                        onChange={(e) => setNews({ ...news, title: e.target.value })}
                        className="border px-2 py-1 w-full h-12"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">Content</label>
                    <textarea
                        value={news.content}
                        onChange={(e) => setNews({ ...news, content: e.target.value })}
                        className="border px-2 py-1 w-full h-48"
                        required
                    />
                </div>
                <button type="submit" className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
                    Update News
                </button>
            </form>
        </div>
    );
};

export default EditNews;