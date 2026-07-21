import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from '../utils/axiosInstance.js';
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        toast.error("Please fill all required fields");
        return;
      }
      setLoading(true);
      const response = await axios.post("/loginUser", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success("Login Successfully");

      setEmail("");
      setPassword("");
      navigate("/welcome", { replace: true });
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
        navigate("/welcome", { replace: true });
    }
}, []);
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-4 py-10 sm:py-16 overflow-hidden bg-gradient-to-br from-emerald-50/60 via-slate-50 to-amber-50/50">
      {/* Decorative Background Gradient Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#F4A261]/25 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-xl shadow-2xl shadow-emerald-950/10 rounded-3xl p-7 sm:p-9 border border-white/80 ring-1 ring-black/5">

        <div className="text-center mb-8">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-[#2E7D32] border border-emerald-200/60 mb-3 shadow-xs">
            Account Access
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#2E7D32] via-[#236327] to-[#1E5621] bg-clip-text text-transparent tracking-tight">
            Welcome Back
          </h1>

          <p className="text-gray-500 text-sm mt-2 font-medium">
            Login to your SwapHub account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              Email Address
            </label>

            <input onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              value={email}
              type="email"
              placeholder="Enter your email"
              className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl px-4 py-3.5 text-gray-800 text-sm outline-none transition-all duration-200 focus:bg-white focus:border-[#2E7D32] focus:ring-4 focus:ring-[#2E7D32]/10"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl px-4 py-3.5 pr-12 text-gray-800 text-sm outline-none transition-all duration-200 focus:bg-white focus:border-[#2E7D32] focus:ring-4 focus:ring-[#2E7D32]/10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2E7D32] transition-colors"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          <div className="text-right">
            <Link
              to="/forgotPassword"
              className="text-xs font-semibold text-[#F4A261] hover:text-[#e76f51] transition-colors hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-gradient-to-r from-[#2E7D32] to-[#1E5621] hover:from-[#256728] hover:to-[#164219] text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-[#2E7D32]/25 hover:shadow-xl hover:shadow-[#2E7D32]/35 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-70 transition-all duration-200 text-sm"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Logging in...
              </span>
            ) : (
              "Login to Account"
            )}
          </button>

        </form>

        <p className="text-center text-xs sm:text-sm text-gray-600 mt-6 pt-5 border-t border-gray-100/80 font-medium">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#F4A261] hover:text-[#e76f51] font-bold transition-colors hover:underline">
            Register Now
          </Link>
        </p>

      </div>
    </section>
  );
};

export default Login;