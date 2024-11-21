import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../images/header/restaurant-logo-removebg-preview-dark.png';

function SecondaryHeader() {
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const storedName = localStorage.getItem('name');
        if (storedName) {
            setUserName(storedName);
        }
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('username');
        localStorage.removeItem('userID');
        localStorage.removeItem('role');
        navigate('/auth');
    };

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
                {userName ? (
                    <div className="relative">
                        <span className="text-white font-bold cursor-pointer"
                              onClick={toggleDropdown}>Hello, {userName}</span>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                                <Link to="/order-history" className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Lịch sử đặt hàng</Link>
                                <button onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Đăng xuất
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/auth" className="text-white hover:text-gray-900">
                        <i className="fas fa-user"></i>
                    </Link>
                )}
            </div>
        </header>
    );
}

export default SecondaryHeader;