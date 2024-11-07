import React from 'react';
import heroImage from '../../images/hero/hero.jpg';

const Hero = () => {
    return (
        <div id="hero" className="relative w-full h-screen text-center text-white">
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');

                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    .fade-in {
                        animation: fadeIn 2s ease-in-out;
                    }
                    .dancing-script {
                        font-family: 'Dancing Script', cursive;
                    }
                `}
            </style>
            <img src={heroImage} alt="" className="w-full h-full object-cover absolute" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-shadow-md fade-in">
                <h1 className="text-8xl font-bold dancing-script">Welcome to NhàHàng</h1>
                <br />
                <p className="text-xl">Trải nghiệm của quý khách luôn là ưu tiên hàng đầu.</p>
            </div>
        </div>
    );
};

export default Hero;