import React, { useEffect, useRef } from 'react';
import aboutImage from '../../../images/about/intro.jpg';

const About = () => {
    const aboutRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                        observer.unobserve(entry.target); // Stop observing after animation
                    }
                });
            },
            { threshold: 0.1 } // Adjust threshold as needed
        );

        if (aboutRef.current) {
            observer.observe(aboutRef.current);
        }

        return () => {
            if (aboutRef.current) {
                observer.unobserve(aboutRef.current);
            }
        };
    }, []);

    return (
        <section id="about" ref={aboutRef} className="relative w-full h-screen md:h-[calc(100vh-100px)] md:pt-12 md:pb-12 flex flex-col md:flex-row items-center justify-center md:justify-end text-white">
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');

                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    .fade-in {
                        opacity: 0; /* Start with hidden */
                        animation: fadeIn 2s ease-in-out forwards; /* forwards to retain the final state */
                    }
                    .dancing-script {
                        font-family: 'Dancing Script', cursive;
                    }
                `}
            </style>
            <img src={aboutImage} className="absolute inset-0 w-full h-full md:w-3/5 md:h-full object-cover"/>
            <div className="relative w-full md:w-2/3 lg:w-1/3 p-5 rounded-lg text-gray-900 m-5 fade-in bg-white bg-opacity-80 md:bg-opacity-80 md:static md:m-5">
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 underline pb-4 dancing-script">Về chúng tôi</h2>
                <p className="mb-5 text-sm md:text-base">
                    NhàHàng nằm tại trung tâm Hà Nội, nổi tiếng với các món ăn truyền thống Việt Nam. Với không gian
                    ấm cúng và trang trí mang đậm nét văn hóa dân tộc, nhà hàng mang đến cho thực khách cảm giác như
                    đang thưởng thức bữa ăn tại chính ngôi nhà của mình.<br></br>
                    Đội ngũ nhân viên thân thiện và chuyên nghiệp luôn sẵn sàng phục vụ, đảm bảo mỗi bữa ăn đều là
                    một trải nghiệm đáng nhớ.
                </p>
                <p className="text-sm md:text-base">
                    NhàHàng tọa lạc tại Số 3 đường Cầu Giấy, phường Láng Thượng, quận Đống Đa, Hà Nội, Việt Nam.
                    NhàHàng mở cửa từ 10:00 đến 23:00 mỗi ngày, mang đến cho thực khách những trải nghiệm ẩm thực
                    tuyệt vời với mức giá từ 80.000 ₫ đến 200.000 ₫.
                </p>
            </div>
        </section>
    );
};

export default About;