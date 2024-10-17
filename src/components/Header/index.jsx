import React from 'react';
import logo from '../../images/header/restaurant-logo-removebg-preview-dark.png';
import {Link} from "react-router-dom";

function Header() {
    const scrollToHero = () => {
        document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToAbout = () => {
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToMenu = () => {
        document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToNews = () => {
        document.getElementById('news').scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToReservation = () => {
        document.getElementById('reservation').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <header className="header flex justify-between items-center p-4 bg-gray-950 z-50 text-white">
            <img src={logo} alt="Logo" className="logo cursor-pointer" onClick={scrollToHero}/>
            <nav>
                <ul className="nav flex space-x-4">
                    <li className="nav-item cursor-pointer" onClick={scrollToAbout}>GIỚI THIỆU</li>
                    <li className="nav-item cursor-pointer" onClick={scrollToMenu}>THỰC ĐƠN</li>
                    <li className="nav-item cursor-pointer" onClick={scrollToNews}>TIN TỨC & SỰ KIỆN</li>
                    <li className="nav-item white-button cursor-pointer" onClick={scrollToReservation}>ĐẶT BÀN</li>
                </ul>
            </nav>
            <div className="icons flex space-x-4">
                <a href="#cart" className="text-white hover:text-gray-900">
                    <i className="fas fa-shopping-cart"></i>
                </a>
                <Link to="/auth" className="text-white hover:text-gray-900">
                    <i className="fas fa-user"></i>
                </Link>
            </div>
        </header>
    );
}

export default Header;