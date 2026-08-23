import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from '../utils/axiosInstance.js';
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InteractiveSwapPortal from "./InteractiveSwapPortal";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // States to drive interactive animations in InteractiveSwapPortal
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isSubmitHovered, setIsSubmitHovered] = useState(false);

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
      console.error(error);
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
      setLoading(true);
      const res = await axios.post("/googleLogin", {
        token: response.credential,
        mode: "login",
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Login Successfully");
      navigate("/welcome", { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Google Login Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/welcome", { replace: true });
      return;
    }

    let script;
    const initGoogleGSI = () => {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "534125867119-nksq5hsn3bqpqskb3n2b7v7nqd37aor8.apps.googleusercontent.com";
      window.google?.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleLogin,
      });

      const btnContainer = document.getElementById("googleSignInButton");
      if (btnContainer) {
        window.google?.accounts.id.renderButton(btnContainer, {
          theme: "outline",
          size: "large",
          width: Math.min(Math.max(btnContainer.clientWidth || 320, 200), 400),
          text: "signin_with",
        });
      }
    };

    if (!document.getElementById("google-gsi-client")) {
      script = document.createElement("script");
      script.id = "google-gsi-client";
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initGoogleGSI;
      document.body.appendChild(script);
    } else {
      initGoogleGSI();
    }
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-8 sm:py-16 overflow-hidden bg-gradient-to-br from-emerald-50/60 via-slate-50 to-amber-50/50">
      
      {/* Background Gradient Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#F4A261]/25 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Main Container: Grid layout for split-screen on desktop (Light Mode) */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-5xl bg-white/90 backdrop-blur-xl shadow-2xl shadow-emerald-950/5 rounded-[32px] border border-white/80 grid grid-cols-1 lg:grid-cols-12 overflow-hidden z-10"
      >
        
        {/* Left Section: Interactive Portal */}
        <div className="lg:col-span-6 bg-slate-50/30 flex flex-col items-center justify-center p-8 sm:p-12 border-b border-slate-100 lg:border-b-0 lg:border-r relative">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />
          
          <div className="text-center mb-6 z-10">
            <h2 className="text-2xl font-bold text-slate-800 tracking-wide">
              The Swap Engine
            </h2>
            <p className="text-slate-500 text-xs mt-1 max-w-xs">
              Watch your items exchange instantly. Focus on fields to control the portal energy.
            </p>
          </div>

          <InteractiveSwapPortal
            isEmailFocused={isEmailFocused}
            isPasswordFocused={isPasswordFocused}
            isSubmitHovered={isSubmitHovered}
            isLoading={loading}
          />
        </div>

        {/* Right Section: Form Card */}
        <div className="lg:col-span-6 flex flex-col justify-center p-8 sm:p-12">
          
          <div className="text-center mb-8">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-[#2E7D32] border border-emerald-200/60 mb-3 shadow-xs">
              Account Access
            </span>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#2E7D32] via-[#236327] to-[#1E5621] bg-clip-text text-transparent tracking-tight">
              Welcome Back
            </h1>
            <p className="text-slate-500 text-sm mt-2 font-medium">
              Login to your SwapHub account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                Email Address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                value={email}
                type="email"
                placeholder="Enter your email"
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl px-4 py-3.5 text-gray-800 text-sm outline-none transition-all duration-200 focus:bg-white focus:border-[#2E7D32] focus:ring-4 focus:ring-[#2E7D32]/10 placeholder-gray-400"
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
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl px-4 py-3.5 pr-12 text-gray-800 text-sm outline-none transition-all duration-200 focus:bg-white focus:border-[#2E7D32] focus:ring-4 focus:ring-[#2E7D32]/10 placeholder-gray-400"
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
              onMouseEnter={() => setIsSubmitHovered(true)}
              onMouseLeave={() => setIsSubmitHovered(false)}
              className="w-full bg-gradient-to-r from-[#2E7D32] to-[#1E5621] hover:from-[#256728] hover:to-[#164219] text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-[#2E7D32]/25 hover:shadow-xl hover:shadow-[#2E7D32]/35 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-70 transition-all duration-200 text-sm cursor-pointer"
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

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-xs font-semibold uppercase tracking-wider">Or continue with</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Google Sign In Button Container */}
            <div className="w-full flex justify-center">
              <div id="googleSignInButton" className="w-full max-w-[350px] min-h-[44px]"></div>
            </div>

          </form>

          <p className="text-center text-xs sm:text-sm text-gray-600 mt-8 pt-5 border-t border-gray-100 font-medium">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#F4A261] hover:text-[#e76f51] font-bold transition-colors hover:underline">
              Register Now
            </Link>
          </p>

        </div>

        </motion.div>
    </section>
  );
};

export default Login;