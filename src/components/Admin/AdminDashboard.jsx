import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './AdminSidebar/AdminSidebar.jsx';
import AdminPosts from './AdminPost/AdminNews.jsx';
import EditNews from './AdminPost/EditNews.jsx';
import AdminStaff from './AdminStaff/AdminStaff.jsx';
import AdminItem_Categories from "./AdminItem/AdminItem_Categories.jsx";
import AdminOrderList from "./AdminOrder/AdminOrderList.jsx";
import AdminItem from "./AdminItem/AdminItem.jsx";
import AdminBookingSchedule from "./AdminTable/AdminBookingSchedule.jsx";
import AdminCustomerList from "./AdminCustomer/AdminCustomerList.jsx";
import AdminTableList from "./AdminTable/AdminTableList.jsx";
import AdminStatistic from "./AdminStatistic/AdminStatistic.jsx";
import AdminOrderHistory from "./AdminOrder/AdminOrderHistory.jsx";
import AdminUserRoles from "./AdminStaff/AdminUserRoles.jsx";
import AdminBookingHistory from "./AdminTable/AdminBookingHistory.jsx";

const AdminDashboard = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="admin-dashboard p-8 bg-gray-100 min-h-screen flex-1 ml-60">
                <Routes>
                    <Route path="/" element={<h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>} />
                    <Route path="order-list" element={<AdminOrderList />} />
                    <Route path="order-history" element={<AdminOrderHistory />} />
                    <Route path="item-categories" element={<AdminItem_Categories />} />
                    <Route path="menu-item" element={<AdminItem />} />
                    <Route path="booking-schedule" element={<AdminBookingSchedule />} />
                    <Route path="booking-history" element={<AdminBookingHistory />} />
                    <Route path="news-list/news/edit/:_id" element={<EditNews />} />
                    <Route path="news-list" element={<AdminPosts />} />
                    <Route path="staff-list" element={<AdminStaff />} />
                    <Route path="user-roles" element={<AdminUserRoles />} />
                    <Route path="customer-list" element={<AdminCustomerList />} />
                    <Route path="table-layout" element={<AdminTableList />} />
                    <Route path="statistics" element={<AdminStatistic />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminDashboard;