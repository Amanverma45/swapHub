import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="top-0 w-full flex justify-center pt-6 px-4">
        <nav className="w-[95%] h-16 max-w-6xl bg-white shadow-md border border-gray-100 rounded-full px-12 flex items-center justify-between relative z-50">

          {/* Logo */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={logo}
                alt="SwapHub Logo"
                className="w-10 h-10 object-contain"
              />

              <h1 className="text-2xl font-bold text-[#2E7D32]">
                SwapHub
              </h1>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-2xl"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              to="/"
              className="text-gray-700 hover:text-[#F4A261] transition"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="text-gray-700 hover:text-[#F4A261] transition"
            >
              Products
            </Link>

            <Link
              to="/login"
              className="text-gray-700 hover:text-[#F4A261] transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-[#2E7D32] hover:bg-[#256728] text-white transition duration-300 px-6 py-2 rounded-full"
            >
              Register
            </Link>
          </div>

          <div
            className={`fixed top-[88px] right-0 rounded-l-3xl rounded-tr-3xl w-50 bg-white shadow-xl z-50 transition-all duration-300 transform md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
              }`}
          >
            <div className="flex flex-col items-start px-3 gap-5 pt-4">

              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-[#F4A261]"
              >
                Home
              </Link>

              <Link
                to="/products"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-[#F4A261]"
              >
                Products
              </Link>

              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-[#F4A261]"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="bg-[#2E7D32] hover:bg-[#256728] text-white px-6 py-2 rounded-full transition"
              >
                Register
              </Link>

            </div>
          </div>

        </nav>
      </div>
    </>
  );
};

export default Navbar;