import React, { useState } from 'react';
import axios from 'axios';

const Statistics = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [statistics, setStatistics] = useState(null);
    const [error, setError] = useState(null);

    const handleFetchStatistics = async () => {
        try {
            const response = await axios.get(`https://localhost:7001/api/Statistics/revenue`, {
                params: {
                    startDate: startDate,
                    endDate: endDate,
                    status: 0
                }
            });
            setStatistics(response.data.result);
            setError(null);
        } catch (error) {
            setError('Error fetching statistics');
            console.error('Error fetching statistics:', error);
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">Statistics</h1>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Start Date</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold">End Date</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
            </div>
            <button
                onClick={handleFetchStatistics}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Fetch Statistics
            </button>
            {error && <div className="mt-4 text-red-500">{error}</div>}
            {statistics && (
                <div className="mt-4 bg-white p-4 rounded shadow">
                    <h2 className="text-2xl font-bold mb-4">Thông tin doanh thu từ {startDate} đến {endDate}</h2>
                    <pre className="bg-gray-100 p-4 rounded">{statistics}</pre>
                </div>
            )}
        </div>
    );
};

export default Statistics;