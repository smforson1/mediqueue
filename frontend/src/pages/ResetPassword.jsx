import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
    const [email, setEmail] = useState("");
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
                        🔄
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-center text-gray-800">
                    Reset Your Password
                </h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Enter your email address and we'll send you a link to reset your password.
                </p>

                {/* Input */}
                <div className="relative mb-5">
                    <span className="absolute left-3 top-2.5 text-gray-400">📧</span>
                    <input
                        type="email"
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* Button */}
                <button
                    onClick={() => navigate('/new-password')}
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg font-semibold shadow-md"
                >
                    Send Reset Link →
                </button>

                {/* Divider */}
                <div className="my-5 border-t"></div>

                {/* Back */}
                <p
                    onClick={() => navigate(-1)}
                    className="text-center text-sm text-blue-600 cursor-pointer hover:underline"
                >
                    ← Back to Login
                </p>
            </div>
        </div>
    );
}