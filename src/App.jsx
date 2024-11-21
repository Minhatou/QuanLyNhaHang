import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Main/Header/Header.jsx';
import SecondaryHeader from "./components/Main/SecondaryHeader/SecondaryHeader.jsx";
import Footer from './components/Main/Footer/Footer.jsx';
import Hero from './components/Main/Hero/Hero.jsx';
import About from './components/Main/About/About.jsx';
import Menu from './components/Main/Menu/Menu.jsx';
import News from './components/Main/News/News.jsx';
import Booking from './components/Main/Booking/Booking.jsx';
import Info from './components/Main/Info/Info.jsx';
import AdminDashboard from './components/Admin/AdminDashboard.jsx';
import AuthForms from './components/Main/Auth/Auth.jsx';
import AdminLogin from './components/Admin/AdminLogin/AdminLogin.jsx';
import NewsDetail from "./components/Main/News/NewsDetail.jsx";
import ShoppingCart from './components/Main/Cart/Cart.jsx';
import OrderHistory from "./components/Main/OrderHistory/OrderHistory.jsx";
import Order from "./components/Main/Order/Order.jsx";
import './App.css';

function App() {
    const [user, setUser] = useState(null);
    const userRole = localStorage.getItem('role');

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/auth" element={<AuthForms setUser={setUser} />} />

                    {userRole === 'table' ? (
                        // Restrict "table" role to only the Order page with SecondaryHeader
                        <>
                            <Route path="/order" element={
                                <>
                                    <SecondaryHeader user={user} />
                                    <Order />
                                    <Footer />
                                </>
                            } />
                            <Route path="/cart" element={
                                <>
                                    <SecondaryHeader user={user} />
                                    <ShoppingCart />
                                    <Footer />
                                </>
                            } />
                            <Route path="*" element={<Navigate to="/order" />} />
                        </>
                    ) : (
                        // Routes for other roles or guests
                        <>
                            <Route path="/" element={
                                <>
                                    <Header user={user} />
                                    <Hero />
                                    <About />
                                    <Menu />
                                    <News />
                                    <Booking />
                                    <Info />
                                    <Footer />
                                </>
                            } />
                            <Route path="/news/:_id" element={
                                <>
                                    <SecondaryHeader user={user} />
                                    <NewsDetail />
                                    <Footer />
                                </>
                            } />
                            <Route path="/order" element={
                                <>
                                    <SecondaryHeader user={user} />
                                    <Order />
                                    <Footer />
                                </>
                            } />
                            <Route path="/cart" element={
                                <>
                                    <SecondaryHeader user={user} />
                                    <ShoppingCart />
                                    <Footer />
                                </>
                            } />
                            <Route path="/order-history" element={
                                <>
                                    <SecondaryHeader user={user} />
                                    <OrderHistory />
                                    <Footer />
                                </>
                            } />
                            <Route path="/admin" element={<AdminLogin />} />
                            <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    );
}

export default App;