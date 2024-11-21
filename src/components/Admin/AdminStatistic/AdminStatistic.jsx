import React, { useState } from 'react';
import axios from 'axios';

const Statistics = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [statistics, setStatistics] = useState(null);
    const [error, setError] = useState(null);
    const storedToken = localStorage.getItem('adminToken');

    const handleFetchStatistics = async () => {
        try {
            const response = await axios.get(`https://localhost:7001/api/Statistics/revenue`, {
                params: {
                    startDate: startDate,
                    endDate: endDate,
                    status: 4
                },
                headers: {
                    'Authorization': `Bearer ${storedToken}`
                }
            });
            setStatistics(response.data.result);
            setError(null);
        } catch (error) {
            setError('Error fetching statistics');
            console.error('Error fetching statistics:', error);
        }
    };

    const setToday = () => {
        const today = new Date();
        const start = new Date(today.setHours(0, 0, 0, 0)).toISOString();
        const end = new Date(today.setHours(23, 59, 59, 999)).toISOString();
        setStartDate(start);
        setEndDate(end);
        handleFetchStatistics();
    };

    const setOneWeek = () => {
        const today = new Date();
        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(today.getDate() - 7);
        const start = new Date(oneWeekAgo.setHours(0, 0, 0, 0)).toISOString();
        const end = new Date(today.setHours(23, 59, 59, 999)).toISOString();
        setStartDate(start);
        setEndDate(end);
        handleFetchStatistics();
    };

    const setOneMonth = () => {
        const today = new Date();
        const oneMonthAgo = new Date(today);
        oneMonthAgo.setDate(today.getDate() - 30);
        const start = new Date(oneMonthAgo.setHours(0, 0, 0, 0)).toISOString();
        const end = new Date(today.setHours(23, 59, 59, 999)).toISOString();
        setStartDate(start);
        setEndDate(end);
        handleFetchStatistics();
    };

    const setAllTime = () => {
        setStartDate('');
        setEndDate('');
        handleFetchStatistics();
    };

    return (
        <div>
            <div className="mt-4">
                <button
                    onClick={setToday}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                >
                    Today
                </button>
                <button
                    onClick={setOneWeek}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                >
                    1 Week
                </button>
                <button
                    onClick={setOneMonth}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                >
                    1 Month
                </button>
                <button
                    onClick={setAllTime}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    All Time
                </button>
            </div>
            {error && <div className="mt-4 text-red-500">{error}</div>}
            {statistics && (
                <div className="mt-4 bg-white p-4 rounded shadow">
                    <h2 className="text-2xl font-bold mb-4">Statistics from {startDate} to {endDate}</h2>
                    <pre className="bg-gray-100 p-4 rounded">{statistics}</pre>
                </div>
            )}
        </div>
    );
};

export default Statistics;