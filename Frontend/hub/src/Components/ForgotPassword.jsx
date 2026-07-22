import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from '../utils/axiosInstance';
const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("/forgotPassword", {
                email,
            });
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };
    return (
        <section className="relative min-h-[85vh] flex items-center justify-center px-4 py-10 sm:py-16 overflow-hidden bg-gradient-to-br from-emerald-50/60 via-slate-50 to-amber-50/50">
            {/* Background Gradient */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#F4A261]/25 rounded-full blur-3xl pointer-events-none animate-pulse" />

            <div className="relative w-full max-w-md bg-white/90 backdrop-blur-xl shadow-2xl shadow-emerald-950/10 rounded-3xl p-7 sm:p-9 border border-white/80 ring-1 ring-black/5">

                <div className="text-center mb-8">
                    <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-[#D97706] border border-amber-200/60 mb-3 shadow-xs">
                        Account Recovery
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#2E7D32] via-[#236327] to-[#1E5621] bg-clip-text text-transparent tracking-tight">
                        Forgot Password
                    </h1>

                    <p className="text-gray-500 text-sm mt-2 font-medium">
                        Enter your registered email and we'll send you a password reset link.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                            Email Address
                        </label>

                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            type="email"
                            placeholder="Enter your email"
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
                                Sending Link...
                            </span>
                        ) : (
                            "Send Reset Link"
                        )}
                    </button>

                </form>

                <p className="text-center text-xs sm:text-sm text-gray-600 mt-6 pt-5 border-t border-gray-100/80 font-medium">
                    Remember your password?{" "}
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

export default ForgotPassword;