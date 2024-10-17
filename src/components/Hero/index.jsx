import React from 'react';

const Hero = () => {
    return (
        <div id="hero" className="relative w-full h-screen text-center text-white">
            <img src="src/images/hero/hero.jpg" alt="" className="w-full h-full object-cover" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-shadow-md">
                <h1 className="text-4xl font-bold">Welcome to NhàHàng</h1>
                <p className="text-xl">Your adventure starts here</p>
            </div>
        </div>
    );
};

export default Hero;