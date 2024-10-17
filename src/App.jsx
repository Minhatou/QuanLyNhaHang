import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/index.jsx';
import Footer from './components/Footer/index.jsx';
import Hero from './components/Hero/index.jsx';
import About from './components/About/index.jsx';
import Menu from './components/Menu/index.jsx';
import News from './components/News/index.jsx';
import Reservation from './components/Reservation/index.jsx';
import Info from './components/Info/index.jsx';
import AdminDashboard from './components/Admin/admindashboard.jsx';
import './App.css';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    {/* Define the routes for each component */}
                    <Route path="/" element={
                        <>
                            <Header/>
                            <Hero/>
                            <About/>
                            <Menu/>
                            <News/>
                            <Reservation/>
                            <Info/>
                            <Footer/>
                        </>
                    }/>
                    {/* Route for the admin dashboard */}
                    <Route path="/admin/*" element={<AdminDashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
