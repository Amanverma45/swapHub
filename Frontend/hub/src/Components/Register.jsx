import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!name || !email || !password) {
        toast.error("Please fill all fields");
        return;
      }
      const response = await axios.post(
        "/saveUser",
        {
          name,
          email,
          password,
        }

      );
      console.log(response.data)
      toast.success("Registration Successful");
      setName("");
      setEmail("");
      setPassword("");
      navigate('/login')
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  }

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-md bg-white shadow-lg rounded-3xl p-8 border border-gray-100">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2E7D32]">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Join SwapHub and start exchanging products
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-2">
              Full Name
            </label>

            <input onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#2E7D32]"
            />
          </div>

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
            Register
          </button>

        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
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

export default Register;