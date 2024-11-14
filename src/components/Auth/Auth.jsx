import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthForms = () => {
    const [activeTab, setActiveTab] = useState('login');
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [signupData, setSignupData] = useState({ userName: '', password: '', confirmPassword: '', phoneNumber: '', name: '' });
    const [loginError, setLoginError] = useState('');
    const [signupError, setSignupError] = useState('');
    const [signupSuccess, setSignupSuccess] = useState('');

    const navigate = useNavigate(); // Hook for redirecting to homepage after login

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');

        if (!loginData.username || !loginData.password) {
            setLoginError('Vui lòng nhập đủ thông tin');
            return;
        }

        try {
            const response = await axios.post('https://localhost:7001/api/auth/login', { ...loginData, role: '15a3795a-47d8-49cd-9f74-d1036b3b53f3' });

            // Store JWT token and user's name in localStorage
            localStorage.setItem('token', response.data.result.token);
            localStorage.setItem('name', response.data.result.user.name);
            localStorage.setItem('userName', response.data.result.user.userName);
            localStorage.setItem('userID', response.data.result.user.id);
            localStorage.setItem('role', response.data.result.user.role);
            navigate('/');
        } catch (error) {
            setLoginError('Tên đăng nhập hoặc mật khẩu không đúng');
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setSignupError('');
        setSignupSuccess('');

        const phoneRegex = /^[0-9]{10,15}$/;

        if (!signupData.userName || !signupData.password || !signupData.confirmPassword || !signupData.phoneNumber || !signupData.name) {
            setSignupError('Please fill in all fields');
            return;
        }

        if (signupData.password !== signupData.confirmPassword) {
            setSignupError('Passwords do not match');
            return;
        }

        if (signupData.password.length < 8) {
            setSignupError('Password must be at least 8 characters long');
            return;
        }

        if (!phoneRegex.test(signupData.phoneNumber)) {
            setSignupError('Invalid phone number format');
            return;
        }

        try {
            const response = await axios.post('https://localhost:7001/api/auth/register', { ...signupData, role: '15a3795a-47d8-49cd-9f74-d1036b3b53f3' });
            setSignupSuccess('Account created successfully! Please log in.');
            console.log(response.data);
        } catch (error) {
            setSignupError('Signup failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Welcome</h2>
                <p className="text-center text-gray-600 mb-6">Đăng nhập hoặc đăng ký tài khoản mới</p>

                <div className="flex mb-6">
                    <button
                        className={`flex-1 py-2 text-center ${activeTab === 'login' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('login')}
                    >
                        Đăng nhập
                    </button>
                    <button
                        className={`flex-1 py-2 text-center ${activeTab === 'signup' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('signup')}
                    >
                        Đăng ký
                    </button>
                </div>

                {activeTab === 'login' && (
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your username"
                                value={loginData.username}
                                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            />
                        </div>
                        {loginError && <div className="text-red-500 text-sm">{loginError}</div>}
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">Login</button>
                    </form>
                )}

                {activeTab === 'signup' && (
                    <form onSubmit={handleSignup} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tên người dùng</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your username"
                                value={signupData.userName}
                                onChange={(e) => setSignupData({ ...signupData, userName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                                value={signupData.password}
                                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nhập lại mật khẩu</label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Confirm your password"
                                value={signupData.confirmPassword}
                                onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your phone number"
                                value={signupData.phoneNumber}
                                onChange={(e) => setSignupData({ ...signupData, phoneNumber: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tên</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your name"
                                value={signupData.name}
                                onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                            />
                        </div>
                        {signupError && <div className="text-red-500 text-sm">{signupError}</div>}
                        {signupSuccess && <div className="text-green-500 text-sm">{signupSuccess}</div>}
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">Đăng ký</button>
                    </form>
                )}
                <div className="text-center mt-4">
                    <Link to="/" className="text-blue-500 hover:underline">Quay lại trang chủ</Link>
                </div>
            </div>
        </div>
    );
};

export default AuthForms;