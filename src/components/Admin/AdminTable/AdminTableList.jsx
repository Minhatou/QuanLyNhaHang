import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TableList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://localhost:7001/api/User');
                const tables = response.data.result.filter(user => user.role === 'table');
                setUsers(tables);
            } catch (error) {
                setError('Error fetching users');
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">Sơ đồ bàn</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="grid grid-cols-3 gap-4">
                {users.map(user => (
                    <div key={user.id} className="p-4 bg-white border rounded shadow flex items-center justify-center h-32">
                        <span className="text-xl font-bold">{user.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TableList;