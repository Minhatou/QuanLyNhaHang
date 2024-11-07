import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams , useNavigate } from 'react-router-dom';

const NewsDetail = () => {
    const { _id } = useParams();
    const [news, setNews] = useState(null);
    const navigate = useNavigate();

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

    if (!news) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-12">
            <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
            <p className="text-gray-700">{news.content}</p>
            <button
                onClick={() => navigate('/')}
                className="mt-5 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Return to Main Page
            </button>
        </div>
    );
};

export default NewsDetail;