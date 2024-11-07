import React, { useEffect, useState } from 'react';
import reservationImage from '../../images/reservation/table-restaurant-food-buffet-interior-design-restaurants-1376921-pxhere.com.jpg';

const Reservation = () => {
    const [name, setName] = useState('');

    useEffect(() => {
        const storedName = localStorage.getItem('name');

        if (storedName) setName(storedName);
    }, []);

    return (
        <section id="reservation" className="w-full h-screen p-12 flex items-center justify-center text-left relative">
            <img src={reservationImage} alt="Reservation" className="w-full h-full object-cover absolute inset-0 z-0" />
            <div className="w-2/5 bg-gray-950 bg-opacity-65 text-white pt-10 pb-10 pl-10 pr-10 relative z-10">
                <h1 className="text-3xl font-bold mb-5">ĐẶT BÀN</h1>
                <h2 className="text-2xl font-bold mb-5">Thông tin đặt bàn</h2>
                <p className="mb-5">
                    Gọi hotline: (+84) 987 654 321 <br />
                    Hoặc điền form đăng ký, chúng tôi sẽ liên hệ tư vấn cho bạn
                </p>
                <form>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
                            Họ tên*:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                            Email*:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="email"
                            name="email"
                            id="email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="phone">
                            Số điện thoại*:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="tel"
                            name="phone"
                            id="phone"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="datetime">
                            Thời gian:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="datetime-local"
                            name="datetime"
                            id="datetime"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="quantity">
                            Số lượng:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="number"
                            name="quantity"
                            id="quantity"
                            min="1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="requests">
                            Yêu cầu khác:
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="requests"
                            id="requests"
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Reservation;