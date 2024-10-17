import React, { useState } from 'react';
import phoBoImage from '../../images/menu/pho-bo.jfif';
import bunChaImage from '../../images/menu/bun-cha.jpg';
import goiCuonImage from '../../images/menu/goi-cuon.jpg';
import banhMiImage from '../../images/menu/banh-mi.jpg';
import chaGioImage from '../../images/menu/cha-gio.jpg';

const Menu = () => {
    const [currentImage, setCurrentImage] = useState(phoBoImage);

    const dishes = [
        { name: 'Phở Bò', image: phoBoImage },
        { name: 'Bún Chả', image: bunChaImage },
        { name: 'Gỏi Cuốn', image: goiCuonImage },
        { name: 'Bánh Mì', image: banhMiImage },
        { name: 'Chả Giò', image: chaGioImage }
    ];

    return (
        <section id="menu" className="h-screen p-12 flex flex-col items-center justify-center text-left">
            <div className="flex w-full h-[480px]">
                <div className="w-2/5 p-5 rounded-lg">
                    <h2 className="text-3xl text-gray-900 font-bold mb-5">THỰC ĐƠN</h2>
                    <div className="flex gap-5">
                        {dishes.map((dish, index) => (
                            <div
                                key={index}
                                className="p-3 rounded-lg hover:bg-gray-200 cursor-pointer"
                                onMouseEnter={() => setCurrentImage(dish.image)}
                            >
                                {dish.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-3/5 flex items-center justify-center">
                    <img src={currentImage} alt="Menu" className="w-full h-full object-cover rounded-lg"/>
                </div>
            </div>
        </section>
    );
};

export default Menu;