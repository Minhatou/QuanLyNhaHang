import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import backgroundNews from '../../images/news/background-news.jpg';

const News = () => {
    const [latestNews, setLatestNews] = useState([]);

    useEffect(() => {
        const fetchLatestNews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/news-list');
                // Assuming the news items are sorted by date in descending order
                setLatestNews(response.data.slice(0, 3));
            } catch (error) {
                console.error('Error fetching latest news:', error);
            }
        };

        fetchLatestNews();
    }, []);
    return (
        <section id="news" className="relative text-gray-900 h-screen p-12 flex flex-col justify-center text-left">
            <div className="absolute inset-0 bg-cover bg-center"
                 style={{backgroundImage: `url(${backgroundNews})`, opacity: 0.65}}></div>
            <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-5">Tin tức & Sự kiện</h2>
                <div className="space-y-5">
                    {latestNews.map(news => (
                        <Link to={`/news/${news._id}`} key={news._id}
                              className="block p-5 bg-white rounded-lg shadow-md">
                            <h1 className="text-2xl font-semibold mb-2">{news.title}</h1>
                            <p className="text-sm text-gray-500 mb-3">{news.content}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
);
};

export default News;