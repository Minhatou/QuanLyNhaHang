import React from 'react';

const newsItems = [
    {
        title: 'Ưu đãi mùa lễ',
        date: '2023-12-20',
        content: 'Chào đón mùa lễ với thực đơn đặc biệt của chúng tôi. Đặt bàn ngay và tận hưởng trải nghiệm ẩm thực đáng nhớ cùng những người thân yêu.'
    },
    {
        title: 'Món mới',
        date: '2023-11-15',
        content: 'Chúng tôi rất vui mừng giới thiệu các món mới trong thực đơn, bao gồm các lựa chọn thuần chay và không chứa gluten. Hãy đến và thử những sáng tạo ẩm thực mới nhất của chúng tôi!'
    },
    {
        title: 'Khai trương',
        date: '2023-10-01',
        content: 'Tham gia cùng chúng tôi trong buổi khai trương nhà hàng mới tại trung tâm Hà Nội. Hưởng ưu đãi đặc biệt và đồ uống chào mừng miễn phí!'
    }
];

const News = () => {
    return (
        <section id="news" className="h-screen p-12 flex flex-col justify-center text-left">
            <h2 className="text-3xl font-bold mb-5">Tin tức & Sự kiện</h2>
            <div className="space-y-5">
                {newsItems.map((item, index) => (
                    <div key={index} className="p-5 bg-white rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-500 mb-3">{new Date(item.date).toLocaleDateString()}</p>
                        <p>{item.content}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default News;