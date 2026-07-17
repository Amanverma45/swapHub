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
    <section className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-3xl p-8 border border-gray-100">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2E7D32]">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Login to your SwapHub account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              value={email}
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#2E7D32]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 outline-none focus:border-[#2E7D32]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#2E7D32]"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>
          <div className="text-right">
            <Link
              to="/forgotPassword"
              className="text-sm text-[#F4A261] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-[#2E7D32] text-white py-3 rounded-xl hover:bg-[#256728] disabled:opacity-70 transition-all duration-300 active:scale-[0.98]"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>

        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <span className="text-[#F4A261] cursor-pointer font-medium">
            <Link to="/register">Register</Link>
          </span>
        </p>

      </div>
    </section>
  );
};

export default Login;