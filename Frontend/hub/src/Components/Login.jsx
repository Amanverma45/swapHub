import { Link } from "react-router-dom";
const Login = () => {
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

        <form className="space-y-5">

          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#2E7D32]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <input
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