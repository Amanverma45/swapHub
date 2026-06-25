import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AiOutlineLogout } from "react-icons/ai";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="w-full flex justify-center pt-6 px-4">
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

            {!token ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-[#F4A261] transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-[#2E7D32] hover:bg-[#256728] text-white px-6 py-2 rounded-full transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/welcome"
                  className="text-gray-700 hover:text-[#F4A261] transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition duration-300"
                >
                  Logout
                  <AiOutlineLogout className="text-lg" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div
            className={`fixed top-0 left-0 h-70 w-full bg-white rounded-b-3xl shadow-xl z-50 transition-all duration-300 transform md:hidden ${isOpen ? "translate-y-0" : "-translate-y-full"
              }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">

              <div className="flex items-center gap-2">
                <img
                  src={logo}
                  alt="SwapHub"
                  className="w-15 h-15 object-contain"
                />

                <div>
                  <h1 className="text-xl font-bold text-[#2E7D32]">
                    SwapHub
                  </h1>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-3xl font-bold text-gray-700 hover:text-black transition px-3"
              >
                ✕
              </button>

            </div>

            <div className="flex flex-col items-end px-8 py-0 gap-3">
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

              {!token ? (
                <>
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
                </>
              ) : (
                <>
                  <Link
                    to="/welcome"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-700 hover:text-[#F4A261]"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition duration-300"
                  >
                    Logout
                    <AiOutlineLogout className="text-lg" />
                  </button>
                </>
              )}
            </div>
          </div>

        </nav>
      </div>
    </>
  );
};

export default Navbar;