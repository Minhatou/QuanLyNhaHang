import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import SecondaryHeader from "./components/SecondaryHeader/SecondaryHeader.jsx";
import Footer from './components/Footer/Footer.jsx';
import Hero from './components/Hero/Hero.jsx';
import About from './components/About/About.jsx';
import Menu from './components/Menu/Menu.jsx';
import News from './components/News/News.jsx';
import Reservation from './components/Reservation/Reservation.jsx';
import Info from './components/Info/index.jsx';
import AdminDashboard from './components/Admin/AdminDashboard.jsx';
import AuthForms from './components/Auth/Auth.jsx';
import AdminLogin from './components/Admin/AdminLogin/AdminLogin.jsx';
import NewsDetail from "./components/News/NewsDetail.jsx";
import ShoppingCart from './components/Cart/Cart.jsx';
import './App.css';

function App() {
    const [user, setUser] = useState(null);
    return (
            <Router>
                <div>
                    <Routes>
                        {/* Define the routes for each component */}
                        <Route path="/" element={
                            <>
                                <Header user={user} />
                                <Hero/>
                                <About/>
                                <Menu/>
                                <News/>
                                <Reservation/>
                                <Info/>
                                <Footer/>
                            </>
                        }/>
                        <Route path="/news/:_id" element={
                            <>
                                <SecondaryHeader user={user} />
                                <NewsDetail/>
                                <Footer/>
                            </>
                        }/>
                        <Route path="/cart" element={
                            <>
                                <SecondaryHeader user={user} />
                                <ShoppingCart />
                                <Footer/>
                            </>
                        }/>
                        {/* Route for the admin dashboard */}
                        <Route path="/auth" element={
                            <AuthForms setUser={setUser} />} />
                        <Route path="/admin" element={<AdminLogin />} />
                        <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
                    </Routes>
                </div>
            </Router>
    );
}

export default App;