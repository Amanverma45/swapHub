import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        alert('Fill the require feild');
        return;
      }
      const response = await axios.post('https://swaphub-backend-855x.onrender.com/api/loginUser', {
        email,
        password
      })
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      alert("Login Successfully");
      setEmail("");
      setPassword("");
      navigate("/welcome");
    } catch (error) {
      console.log(error)
      alert(error.response?.data?.message || "Login Failed");
    }
  }
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

            <input onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#2E7D32]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2E7D32] text-white py-3 rounded-xl hover:bg-[#256728] transition"
          >
            Login
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