import React, { useEffect, useState } from 'react';
import logo from '../../images/header/restaurant-logo-removebg-preview-dark.png';
import { Link, useNavigate } from "react-router-dom";

function Header() {
    const [userName, setUserName] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedName = localStorage.getItem('name');
        if (storedName) {
            setUserName(storedName);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('username');
        localStorage.removeItem('userID');
        navigate('/auth');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <header className="header flex justify-between items-center p-4 bg-gray-950 z-50 text-white">
            <img src={logo} alt="Logo" className="logo cursor-pointer"
                 onClick={() => document.getElementById('hero').scrollIntoView({behavior: 'smooth'})}/>
            <nav>
                <ul className="nav flex space-x-4">
                    <li className="nav-item cursor-pointer"
                        onClick={() => document.getElementById('about').scrollIntoView({behavior: 'smooth'})}>GIỚI THIỆU
                    </li>
                    <li className="nav-item cursor-pointer"
                        onClick={() => document.getElementById('menu').scrollIntoView({behavior: 'smooth'})}>THỰC ĐƠN
                    </li>
                    <li className="nav-item cursor-pointer"
                        onClick={() => document.getElementById('news').scrollIntoView({behavior: 'smooth'})}>TIN TỨC &
                        SỰ KIỆN
                    </li>
                    <li className="nav-item white-button cursor-pointer"
                        onClick={() => document.getElementById('reservation').scrollIntoView({behavior: 'smooth'})}>ĐẶT
                        BÀN
                    </li>
                </ul>
            </nav>
            <div className="icons flex space-x-4 relative">
                {userName && (
                    <Link to="/cart" className="text-white hover:text-gray-900">
                        <i className="fas fa-shopping-cart"></i>
                    </Link>
                )}

                {userName ? (
                    <div className="relative">
                        <span className="text-white font-bold cursor-pointer"
                              onClick={toggleDropdown}>Hello, {userName}</span>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
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

export default Header;