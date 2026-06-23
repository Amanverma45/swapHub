import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex justify-center pt-6 px-4">
      <nav className="w-[95%] h-16 max-w-6xl bg-white shadow-md border border-gray-100 rounded-full px-12 py-4 flex flex-col md:flex-row items-center justify-between">

        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="SwapHub Logo"
              className="w-10 h-10 object-contain"
            />

            <h1 className="text-2xl font-bold text-[#2E7D32] -mt-[2px]">
              SwapHub
            </h1>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-center gap-4 md:gap-10 mt-5 md:mt-0 w-full md:w-auto`}
        >
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 hover:text-[#F4A261] transition"
          >
            Home
          </Link>

          <Link
            to="/products"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 hover:text-[#F4A261] transition"
          >
            Products
          </Link>

          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 hover:text-[#F4A261] transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            onClick={() => setIsOpen(false)}
            className="bg-[#2E7D32] hover:bg-[#256728] text-white transition duration-300 w-25 h-10 py-2 text-center rounded-full"
          >
            Register
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;