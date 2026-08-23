import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InteractiveRegisterPortal from "./InteractiveRegisterPortal";
import { motion } from "framer-motion";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // OTP States
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // States to drive interactive animations in InteractiveRegisterPortal
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isSubmitHovered, setIsSubmitHovered] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/sendRegistrationOtp", {
        email: email.trim().toLowerCase(),
      });
      toast.success(response.data.message || "OTP sent successfully");
      setOtpSent(true);
      setCountdown(30);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setOtpLoading(true);
    try {
      const response = await axios.post("/sendRegistrationOtp", {
        email: email.trim().toLowerCase(),
      });
      toast.success(response.data.message || "OTP resent successfully");
      setCountdown(30);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      toast.error("Please enter the OTP");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "/saveUser",
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          otp: otp.trim(),
        }
      );
      console.log(response.data);
      toast.success("Registration Successful");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setOtp("");
      setOtpSent(false);
      navigate('/login');
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
      setLoading(true);
      const res = await axios.post("/googleLogin", {
        token: response.credential,
        mode: "signup",
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Account Created & Logged In Successfully");
      navigate("/welcome", { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Google Sign-Up Failed");
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

      const btnContainer = document.getElementById("googleSignUpButton");
      if (btnContainer) {
        window.google?.accounts.id.renderButton(btnContainer, {
          theme: "outline",
          size: "large",
          width: Math.min(Math.max(btnContainer.clientWidth || 320, 200), 400),
          text: "signup_with",
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
  }, [otpSent]);

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
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />
          
          <div className="text-center mb-6 z-10">
            <h2 className="text-2xl font-bold text-slate-800 tracking-wide">
              The Swap Network
            </h2>
            <p className="text-slate-500 text-xs mt-1 max-w-xs">
              Connect your new inventory box with the community. Fill in your credentials to link up.
            </p>
          </div>

          <InteractiveRegisterPortal
            isNameFocused={isNameFocused}
            isEmailFocused={isEmailFocused}
            isPasswordFocused={isPasswordFocused}
            isSubmitHovered={isSubmitHovered}
            isLoading={loading}
          />
        </div>

        {/* Right Section: Form Card */}
        <div className="lg:col-span-6 flex flex-col justify-center p-8 sm:p-12">
          
          <div className="text-center mb-8">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-[#D97706] border border-amber-200/60 mb-3 shadow-xs">
              {otpSent ? "Email Verification" : "Join the Community"}
            </span>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#2E7D32] via-[#236327] to-[#1E5621] bg-clip-text text-transparent tracking-tight">
              {otpSent ? "Verify OTP" : "Create Account"}
            </h1>
            <p className="text-slate-500 text-sm mt-2 font-medium">
              {otpSent ? `Enter the 6-digit code sent to ${email}` : "Join SwapHub and start exchanging products"}
            </p>
          </div>

          {!otpSent ? (
            <form className="space-y-5" onSubmit={handleSendOtp}>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Enter your full name"
                  onFocus={() => setIsNameFocused(true)}
                  onBlur={() => setIsNameFocused(false)}
                  className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl px-4 py-3.5 text-gray-800 text-sm outline-none transition-all duration-200 focus:bg-white focus:border-[#2E7D32] focus:ring-4 focus:ring-[#2E7D32]/10 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
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
                    placeholder="Create a strong password"
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

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    type={showPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl px-4 py-3.5 pr-12 text-gray-800 text-sm outline-none transition-all duration-200 focus:bg-white focus:border-[#2E7D32] focus:ring-4 focus:ring-[#2E7D32]/10 placeholder-gray-400"
                  />
                </div>
              </div>

              <button
                disabled={loading}
                type="submit"
                onMouseEnter={() => setIsSubmitHovered(true)}
                onMouseLeave={() => setIsSubmitHovered(false)}
                className="w-full bg-gradient-to-r from-[#2E7D32] to-[#1E5621] hover:from-[#256728] hover:to-[#164219] text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-[#2E7D32]/25 hover:shadow-xl hover:shadow-[#2E7D32]/35 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-70 transition-all duration-200 text-sm mt-2 cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Sending OTP...</span>
                  </span>
                ) : (
                  "Send Verification OTP"
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
                <div id="googleSignUpButton" className="w-full max-w-[350px] min-h-[44px]"></div>
              </div>
            </form>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  One-Time Password (OTP)
                </label>
                <input
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  value={otp}
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl px-4 py-3.5 text-center text-lg font-bold tracking-[8px] text-gray-800 outline-none transition-all duration-200 focus:bg-white focus:border-[#2E7D32] focus:ring-4 focus:ring-[#2E7D32]/10 placeholder-gray-400 placeholder:tracking-normal placeholder:font-medium placeholder:text-sm"
                />
              </div>

              <div className="flex flex-col gap-3">
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#2E7D32] to-[#1E5621] hover:from-[#256728] hover:to-[#164219] text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-[#2E7D32]/25 hover:shadow-xl hover:shadow-[#2E7D32]/35 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-70 transition-all duration-200 text-sm cursor-pointer"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Verifying...</span>
                    </span>
                  ) : (
                    "Verify & Register"
                  )}
                </button>

                <div className="flex items-center justify-between mt-2 px-1">
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="text-xs font-bold text-gray-500 hover:text-gray-700 transition"
                  >
                    ← Edit Info
                  </button>

                  <button
                    disabled={countdown > 0 || otpLoading}
                    type="button"
                    onClick={handleResendOtp}
                    className="text-xs font-bold text-[#F4A261] hover:text-[#e76f51] transition disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {otpLoading
                      ? "Resending..."
                      : countdown > 0
                      ? `Resend OTP in ${countdown}s`
                      : "Resend OTP"}
                  </button>
                </div>
              </div>
            </form>
          )}

          <p className="text-center text-xs sm:text-sm text-gray-600 mt-8 pt-5 border-t border-gray-100 font-medium">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#F4A261] hover:text-[#e76f51] font-bold transition-colors hover:underline"
            >
              Login Here
            </Link>
          </p>

        </div>

        </motion.div>
    </section>
  );
};

export default Register;