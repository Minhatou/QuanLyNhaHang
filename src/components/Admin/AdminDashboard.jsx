import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './AdminSidebar/AdminSidebar.jsx';
import AdminPosts from './AdminPost/AdminNews.jsx';
import EditNews from './AdminPost/EditNews.jsx';
import AdminStaff from './AdminStaff/AdminStaff.jsx';
import AdminCustomer from './AdminCustomer/admin-customer.jsx';
import AdminItem_Categories from "./AdminItem/AdminItem_Categories.jsx";
import AdminOrder from "./AdminOrder/AdminOrder.jsx";
import AdminItem from "./AdminItem/AdminItem.jsx";
import AdminReservationSchedule from "./AdminTable/AdminReservationSchedule.jsx";

const AdminDashboard = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="admin-dashboard p-8 bg-gray-100 min-h-screen flex-1">
                <Routes>
                    <Route path="/" element={<h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>} />
                    <Route path="/order-list" element={<AdminOrder />} />
                    <Route path="item-categories" element={<AdminItem_Categories />} />
                    <Route path="menu-item" element={<AdminItem />} />
                    <Route path="reservation-schedule" element={<AdminReservationSchedule />} />
                    <Route path="news-list/news/edit/:_id" element={<EditNews />} />
                    <Route path="news-list" element={<AdminPosts />} />
                    <Route path="staff-list" element={<AdminStaff />} />
                    <Route path="customer-list" element={<AdminCustomer />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminDashboard;