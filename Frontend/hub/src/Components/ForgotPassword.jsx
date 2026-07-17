import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        // API next step me call karenge
    };
    return (
        <section className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-3xl p-8 border border-gray-100">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#2E7D32]">
                        Forgot Password
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Enter your registered email and we'll send you a password reset link.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Email
                        </label>

                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            type="email"
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#2E7D32]"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#2E7D32] text-white py-3 rounded-xl hover:bg-[#256728] disabled:opacity-70 transition-all duration-300"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                Sending...
                            </span>
                        ) : (
                            "Send Reset Link"
                        )}
                    </button>

                </form>

                <p className="text-center text-gray-600 mt-6">
                    Remember your password?{" "}
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

export default ForgotPassword;