import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/header/restaurant-logo-removebg-preview-dark.png';

function SecondaryHeader() {
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedName = localStorage.getItem('name');
        if (storedName) {
            setUserName(storedName);
        }
    }, []);

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <header className="header flex justify-between items-center p-4 bg-gray-950 z-50 text-white">
            <img src={logo} alt="Logo" className="logo cursor-pointer" onClick={handleLogoClick} />
            <div className="icons flex space-x-4 relative">
                <Link to="/cart" className="text-white hover:text-gray-900">
                    <i className="fas fa-shopping-cart"></i>
                </Link>
                {userName && (
                    <span className="text-white font-bold">Hello, {userName}</span>
                )}
            </div>
        </header>
    );
}

export default SecondaryHeader;