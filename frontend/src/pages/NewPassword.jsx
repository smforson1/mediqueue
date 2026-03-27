import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewPassword() {
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
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

            <div className="relative z-10 w-[380px] bg-white/90 rounded-xl shadow-xl p-8">

                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-full text-xl">
                        🔑
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-800 text-center">
                    Set New Password
                </h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Choose a strong password to keep your account secure.
                </p>

                {/* New Password */}
                <div className="relative mb-4">
                    <input
                        type={show1 ? "text" : "password"}
                        placeholder="New Password"
                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <span
                        onClick={() => setShow1(!show1)}
                        className="absolute right-3 top-2.5 cursor-pointer"
                    >
                        👁️
                    </span>
                </div>

                {/* Confirm Password */}
                <div className="relative mb-4">
                    <input
                        type={show2 ? "text" : "password"}
                        placeholder="Confirm New Password"
                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <span
                        onClick={() => setShow2(!show2)}
                        className="absolute right-3 top-2.5 cursor-pointer"
                    >
                        👁️
                    </span>
                </div>

                {/* Info Box */}
                <div className="bg-gray-100 text-gray-600 text-xs p-3 rounded-md mb-5">
                    ℹ️ Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.
                </div>

                {/* Button */}
                <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg font-semibold shadow-md">
                    Update Password 🔑
                </button>

                {/* Back */}
                <p
                    onClick={() => navigate('/login')}
                    className="text-center mt-5 text-sm text-blue-600 cursor-pointer hover:underline"
                >
                    ← Back to Login
                </p>
            </div>
        </div>
    );
}