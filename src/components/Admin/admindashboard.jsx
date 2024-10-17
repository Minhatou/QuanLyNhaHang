import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './AdminSidebar/admin-sidebar';
import AdminPosts from './AdminPost/AdminPost.jsx';
import AdminStaff from './AdminStaff/admin-staff.jsx';
import AdminCustomer from './AdminCustomer/admin-customer.jsx';

const AdminDashboard = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="admin-dashboard p-8 bg-gray-100 min-h-screen flex-1">
                <Routes>
                    <Route path="/" element={<h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>} />
                    <Route path="/post-list" element={<AdminPosts />} />
                    <Route path="/staff-list" element={<AdminStaff />} />
                    <Route path="/customer-list" element={<AdminCustomer />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminDashboard;