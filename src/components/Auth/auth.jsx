import React, { useState } from 'react';
import {Link} from "react-router-dom";

const AuthForms = () => {
    const [activeTab, setActiveTab] = useState('login');
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [loginError, setLoginError] = useState('');
    const [signupError, setSignupError] = useState('');
    const [signupSuccess, setSignupSuccess] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setLoginError('');

        if (!loginData.email || !loginData.password) {
            setLoginError('Please fill in all fields');
            return;
        }

        // Here you would typically make an API call to your backend
        console.log('Login attempt with:', loginData);
    };

    const handleSignup = (e) => {
        e.preventDefault();
        setSignupError('');
        setSignupSuccess('');

        if (!signupData.name || !signupData.email || !signupData.password || !signupData.confirmPassword) {
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

        // Here you would typically make an API call to your backend
        console.log('Signup attempt with:', signupData);
        setSignupSuccess('Account created successfully! Please log in.');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Welcome</h2>
                <p className="text-center text-gray-600 mb-6">Đăng nhập hoặc đăng ký tài khoản mới</p>

                {/* Tabs */}
                <div className="flex mb-6">
                    <button
                        className={`flex-1 py-2 text-center ${
                            activeTab === 'login'
                                ? 'border-b-2 border-blue-500 text-blue-500'
                                : 'text-gray-500'
                        }`}
                        onClick={() => setActiveTab('login')}
                    >
                        Đăng nhập
                    </button>
                    <button
                        className={`flex-1 py-2 text-center ${
                            activeTab === 'signup'
                                ? 'border-b-2 border-blue-500 text-blue-500'
                                : 'text-gray-500'
                        }`}
                        onClick={() => setActiveTab('signup')}
                    >
                        Đăng ký
                    </button>
                </div>

                {/* Login Form */}
                {activeTab === 'login' && (
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                                value={loginData.email}
                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Mật khẩu
                            </label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            />
                        </div>
                        {loginError && (
                            <div className="text-red-500 text-sm">
                                {loginError}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Đăng nhập
                        </button>
                    </form>
                )}

                {/* Signup Form */}
                {activeTab === 'signup' && (
                    <form onSubmit={handleSignup} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Họ tên
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your name"
                                value={signupData.name}
                                onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                                value={signupData.email}
                                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Mật khẩu
                            </label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                                value={signupData.password}
                                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nhập lại mật khẩu
                            </label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Confirm your password"
                                value={signupData.confirmPassword}
                                onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                            />
                        </div>
                        {signupError && (
                            <div className="text-red-500 text-sm">
                                {signupError}
                            </div>
                        )}
                        {signupSuccess && (
                            <div className="text-green-500 text-sm">
                                {signupSuccess}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Đăng ký
                        </button>
                    </form>
                )}
                <div className="text-center mt-4">
                    <Link to="/" className="text-blue-500 hover:underline">
                        Quay lại trang chủ
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AuthForms;