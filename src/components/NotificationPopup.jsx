// src/components/NotificationPopup.jsx
import React, { useEffect } from 'react';

const NotificationPopup = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed bottom-16 right-4 bg-green-500 text-white p-4 rounded shadow-lg z-50">
            {message}
        </div>
    );
};

export default NotificationPopup;