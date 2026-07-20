import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../utils/axiosInstance";

// NAYA COMPONENT: Email link (/reset-password/:token) par click hone ke baad 
// ye component user se naya password input leta hai aur backend API ko bhejta hai.
const ResetPassword = () => {
    const { token } = useParams(); // URL params se reset token extract kar rahe hain
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newPassword || !confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        try {
            setLoading(true);
            // Backend resetPassword API call
            const response = await axios.post("/resetPassword", {
                token,
                newPassword,
            });

            toast.success(response.data.message || "Password reset successfully!");
            // Password change safalta purvak hone par login page par redirect kar rahe hain
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong. Link may be invalid or expired.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-3xl p-8 border border-gray-100">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#2E7D32]">
                        Set New Password
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Enter your new password below.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            New Password
                        </label>
                        <input
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            type="password"
                            placeholder="Enter new password"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#2E7D32]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Confirm New Password
                        </label>
                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            placeholder="Confirm new password"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#2E7D32]"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#2E7D32] text-white py-3 rounded-xl hover:bg-[#256728] disabled:opacity-70 transition-all duration-300 font-medium"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                Updating Password...
                            </span>
                        ) : (
                            "Reset Password"
                        )}
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-6">
                    Back to{" "}
                    <Link
                        to="/login"
                        className="text-[#F4A261] font-medium hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </section>
    );
};

export default ResetPassword;
