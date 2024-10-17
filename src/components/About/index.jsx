import React from 'react';

const About = () => {
    return (
        <section id="about" className="relative w-full h-screen flex items-center justify-end text-white">
            <img src="/src/images/about/intro.jpg" className="absolute inset-0 w-3/5 h-screen object-cover"/>
            <div className="relative w-2/3 md:w-2/5 lg:w-1/3 p-5 rounded-lg text-gray-900 m-5">
                <h2 className="text-4xl font-bold text-gray-900 underline pb-4">Về chúng tôi</h2>
                <p className="mb-5">
                    NhàHàng nằm tại trung tâm Hà Nội, nổi tiếng với các món ăn truyền thống Việt Nam. Với không gian
                    ấm cúng và trang trí mang đậm nét văn hóa dân tộc, nhà hàng mang đến cho thực khách cảm giác như
                    đang thưởng thức bữa ăn tại chính ngôi nhà của mình.<br></br>
                    Đội ngũ nhân viên thân thiện và chuyên nghiệp luôn sẵn sàng phục vụ, đảm bảo mỗi bữa ăn đều là
                    một trải nghiệm đáng nhớ.
                </p>
                <p>
                    NhàHàng tọa lạc tại Số 3 đường Cầu Giấy, phường Láng Thượng, quận Đống Đa, Hà Nội, Việt Nam.
                    NhàHàng mở cửa từ 10:00 đến 23:00 mỗi ngày, mang đến cho thực khách những trải nghiệm ẩm thực
                    tuyệt vời với mức giá từ 80.000 ₫ đến 200.000 ₫.
                </p>
            </div>
        </section>
    );
};

export default About;