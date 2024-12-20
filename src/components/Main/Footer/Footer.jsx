import React from 'react';

const Footer = () => {
    return (
        <footer className="footer bg-gray-950 text-white py-6 z-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p className="hidden md:block text-gray-400">© 2024 My Website. All rights reserved.</p>
                    </div>
                    <div className="flex space-x-4">
                        <a href="https://www.facebook.com/dhgtvtcaugiay" className="text-gray-400 hover:text-white">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://www.instagram.com/explore/locations/162355380937761/truong-ai-hoc-giao-thong-van-tai/" className="text-gray-400 hover:text-white">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;