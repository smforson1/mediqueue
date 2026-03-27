import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage({ initialTab = "login" }) {
    const [activeTab, setActiveTab] = useState(initialTab);
    const navigate = useNavigate();
    return (
        <div
            className="h-screen flex items-center justify-center bg-cover bg-center relative"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3')",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-md"></div>

            {/* Card */}
            <div className="relative z-10 w-[380px] bg-white/80 backdrop-blur-lg rounded-xl shadow-xl p-8">

                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-blue-800">MediQueue</h2>
                    <p className="text-sm text-gray-500">Patient Flow Management</p>
                </div>

                {/* Tabs */}
                <div className="flex mb-6 border-b text-sm">
                    <button
                        onClick={() => setActiveTab("login")}
                        className={`w-1/2 pb-2 ${activeTab === "login"
                            ? "text-blue-800 border-b-2 border-blue-800"
                            : "text-gray-400"
                            }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setActiveTab("register")}
                        className={`w-1/2 pb-2 ${activeTab === "register"
                            ? "text-blue-800 border-b-2 border-blue-800"
                            : "text-gray-400"
                            }`}
                    >
                        Register
                    </button>
                </div>

                {/* LOGIN */}
                {activeTab === "login" && (
                    <form className="space-y-4">
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-gray-400">📧</span>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-700 outline-none"
                            />
                        </div>

                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-gray-400">🔒</span>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-700 outline-none"
                            />
                        </div>

                        <div className="flex items-center text-xs text-gray-600">
                            <input type="checkbox" className="mr-2" />
                            I am a Clinic Administrator
                        </div>

                        <button className="w-full bg-blue-800 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold">
                            LOGIN
                        </button>

                        <p
                            onClick={() => navigate('/reset-password')}
                            className="text-center text-xs text-blue-600 hover:underline cursor-pointer"
                        >
                            Forgot Password?
                        </p>
                    </form>
                )}

                {/* REGISTER */}
                {activeTab === "register" && (
                    <form className="space-y-4">
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-gray-400">👤</span>
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-700 outline-none"
                            />
                        </div>

                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-gray-400">📧</span>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-700 outline-none"
                            />
                        </div>

                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-gray-400">🔒</span>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-700 outline-none"
                            />
                        </div>

                        <button className="w-full bg-blue-800 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold">
                            REGISTER
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}