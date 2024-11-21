// src/components/NotificationModal/NotificationModal.jsx
import React, { useEffect } from 'react';

const NotificationModal = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-4">Notification</h2>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default NotificationModal;