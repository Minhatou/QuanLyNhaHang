import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Sidebar = () => {
    const [openMenus, setOpenMenus] = useState({});

    const toggleMenu = (menu) => {
        setOpenMenus((prev) => {
            const newOpenMenus = {};
            Object.keys(prev).forEach(key => {
                newOpenMenus[key] = false;
            });
            return { ...newOpenMenus, [menu]: !prev[menu] };
        });
    };
    const [staffName, setStaffName] = useState('');

    useEffect(() => {
        const name = localStorage.getItem('adminName');
        if (name) {
            setStaffName(name);
        }
    }, []);
    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminName');
        localStorage.removeItem('adminUserName');
        localStorage.removeItem('adminUserID');
        navigate('/admin');
    };

    return (
        <div className="sidebar bg-gray-800 text-white w-64 min-h-screen p-4">
            <Link to="/admin/dashboard" className="text-2xl font-bold mb-6 block text-white">Admin Menu</Link>
            <ul className="space-y-4">
                <li><Link to="./statistics" className="hover:text-gray-400 text-white">Thống kê</Link></li>
                <li>
                    <div onClick={() => toggleMenu('hoadon')} className="cursor-pointer text-white"><Link
                        to="./current-orders" className="text-white">Hoá đơn</Link></div>
                    {openMenus.hoadon && (
                        <ul className="pl-4">
                            <li><Link to="./current-orders" className="text-white">Đơn hiện thời</Link></li>
                            <li><Link to="./order-history" className="text-white">Lịch sử đơn hàng</Link></li>
                        </ul>
                    )}
                </li>
                <li>
                    <div onClick={() => toggleMenu('mathang')} className="cursor-pointer text-white"><Link
                        to="./item-categories" className="text-white">Mặt hàng</Link></div>
                    {openMenus.mathang && (
                        <ul className="pl-4 pt-2 space-y-2">
                            <li><Link to="./item-categories" className="text-white">Danh mục mặt hàng</Link></li>
                            <li><Link to="./menu-item" className="text-white">Danh sách</Link></li>
                        </ul>
                    )}
                </li>
                <li>
                    <div onClick={() => toggleMenu('datban')} className="cursor-pointer text-white"><Link
                        to="./table-layout" className="text-white">Đặt bàn</Link></div>
                    {openMenus.datban && (
                        <ul className="pl-4">
                            <li><Link to="./table-layout" className="text-white">Sơ đồ bàn</Link></li>
                            <li><Link to="./reservation-schedule" className="text-white">Lịch đặt bàn</Link></li>
                            <li><Link to="./reservation-history" className="text-white">Lịch sử đặt bàn</Link></li>
                        </ul>
                    )}
                </li>
                <li>
                    <div onClick={() => toggleMenu('dathang')} className="cursor-pointer text-white"><Link
                        to="./order-list" className="text-white">Đặt hàng</Link></div>
                    {openMenus.dathang && (
                        <ul className="pl-4">
                            <li><Link to="./order-list" className="text-white">Danh sách đơn đặt</Link></li>
                        </ul>
                    )}
                </li>
                <li>
                    <div onClick={() => toggleMenu('nhanvien')} className="cursor-pointer text-white"><Link
                        to="./staff-list" className="text-white">Nhân viên</Link></div>
                    {openMenus.nhanvien && (
                        <ul className="pt-2 pl-4">
                            <li><Link to="./staff-list" className="text-white">Danh sách nhân viên</Link></li>
                            <li><Link to="./staff-roles" className="text-white">Phân Quyền</Link></li>
                        </ul>
                    )}
                </li>
                <li>
                    <div onClick={() => toggleMenu('khachhang')} className="cursor-pointer text-white"><Link
                        to="./customer-list" className="text-white">Khách hàng</Link></div>
                    {openMenus.khachhang && (
                        <ul className="pt-2 pl-4">
                            <li><Link to="./customer-list" className="text-white">Danh sách khách hàng</Link></li>
                        </ul>
                    )}
                </li>
                <li>
                    <div onClick={() => toggleMenu('baidang')} className="cursor-pointer text-white"><Link
                        to="./news-list" className="text-white">Bài đăng</Link></div>
                    {openMenus.baidang && (
                        <ul className="pt-2 pl-4">
                            <li><Link to="./news-list" className="text-white">Danh sách bài đăng</Link></li>
                        </ul>
                    )}
                </li>
            </ul>
            <div className="p-4">
                <p className="text-sm cursor-pointer" onClick={() => setShowLogout(!showLogout)}>Hello, {staffName}</p>
                {showLogout && (
                    <button onClick={handleLogout} className="mt-2 bg-red-500 text-white py-1 px-2 rounded">Log
                        Out</button>
                )}
            </div>
        </div>

    );
};

export default Sidebar;