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
        <section className="relative min-h-[85vh] flex items-center justify-center px-4 py-10 sm:py-16 overflow-hidden bg-gradient-to-br from-emerald-50/60 via-slate-50 to-amber-50/50">
            {/* Decorative Background Gradient Orbs */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#F4A261]/25 rounded-full blur-3xl pointer-events-none animate-pulse" />

            <div className="relative w-full max-w-md bg-white/90 backdrop-blur-xl shadow-2xl shadow-emerald-950/10 rounded-3xl p-7 sm:p-9 border border-white/80 ring-1 ring-black/5">

                <div className="text-center mb-8">
                    <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-[#2E7D32] border border-emerald-200/60 mb-3 shadow-xs">
                        Security Update
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#2E7D32] via-[#236327] to-[#1E5621] bg-clip-text text-transparent tracking-tight">
                        Set New Password
                    </h1>
                    <p className="text-gray-500 text-sm mt-2 font-medium">
                        Enter your new password below.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                            New Password
                        </label>
                        <input
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            type="password"
                            placeholder="Enter new password"
                            className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl px-4 py-3.5 text-gray-800 text-sm outline-none transition-all duration-200 focus:bg-white focus:border-[#2E7D32] focus:ring-4 focus:ring-[#2E7D32]/10"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                            Confirm New Password
                        </label>
                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            placeholder="Confirm new password"
                            className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl px-4 py-3.5 text-gray-800 text-sm outline-none transition-all duration-200 focus:bg-white focus:border-[#2E7D32] focus:ring-4 focus:ring-[#2E7D32]/10"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-[#2E7D32] to-[#1E5621] hover:from-[#256728] hover:to-[#164219] text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-[#2E7D32]/25 hover:shadow-xl hover:shadow-[#2E7D32]/35 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-70 transition-all duration-200 text-sm mt-2"
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

                <p className="text-center text-xs sm:text-sm text-gray-600 mt-6 pt-5 border-t border-gray-100/80 font-medium">
                    Back to{" "}
                    <Link
                        to="/login"
                        className="text-[#F4A261] hover:text-[#e76f51] font-bold transition-colors hover:underline"
                    >
                        Login Here
                    </Link>
                </p>

            </div>
        </section>
    );
};

export default ResetPassword;
