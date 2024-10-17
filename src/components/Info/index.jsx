import React from 'react';
import news2Image from '../../images/info/news2.jpg';

const Info = () => {
    return (
        <section id="info" className="relative p-12 text-white text-left" style={{ backgroundImage: `url(${news2Image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-gray-950 opacity-80"></div>
            <div className="relative mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 pb-12">
                <iframe className="col-span-2"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29797.463380064073!2d105.77396177277795!3d21.00534361081267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab424a50fff9%3A0xbe3a7f3670c0a45f!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBHaWFvIFRow7RuZyBW4bqtbiBU4bqjaQ!5e0!3m2!1svi!2s!4v1729116663088!5m2!1svi!2s"
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="flex flex-col justify-center">
                    <p className="mt-5">
                        No. 3 Cau Giay Street, Lang Thuong Ward, Dong Da District, Hanoi, Vietnam.<br />
                        Booking: (+84) 967 654 321<br />
                        Opening: 10:00 a.m - 10:00 p.m<br />
                        Free parking lots - Public parking
                    </p>
                    <div className="mt-5 flex space-x-4">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white font-bold py-2 px-4 rounded">
                            Facebook
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="bg-pink-500 text-white font-bold py-2 px-4 rounded">
                            Instagram
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Info;