import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { AiOutlineLogout } from "react-icons/ai";
import { FaBell } from "react-icons/fa";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import axios from "../utils/axiosInstance";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    setIsOpen(false);
  };

  const getNotificationCount = async () => {
    try {
      const response = await axios.get("/notificationCount");
      setNotificationCount(response.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getNotificationCount();
    }
  }, [token]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs md:hidden z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Floating Glassmorphic Navbar Container */}
      <header className="sticky top-2 sm:top-3 z-50 w-full flex justify-center px-2.5 sm:px-4 mb-3 sm:mb-6">
        <nav className="w-[98%] sm:w-[95%] max-w-6xl h-13 sm:h-16 bg-white/90 backdrop-blur-md shadow-lg shadow-gray-200/50 border border-gray-100 rounded-full px-4 sm:px-8 md:px-10 flex items-center justify-between transition-all duration-300">
          
          {/* Left: Logo Area */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src={logo}
                alt="SwapHub Logo"
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#2E7D32] tracking-tight">
                Swap<span className="text-[#F4A261]">Hub</span>
              </h1>
            </Link>

            {/* Mobile Hamburger Icon Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center justify-center p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white active:scale-95 transition-all duration-200 shadow-xs"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <HiOutlineX className="text-xl" />
              ) : (
                <HiOutlineMenuAlt3 className="text-xl" />
              )}
            </button>
          </div>

          {/* Center: Desktop Nav Links */}
          <div className="hidden md:flex items-center justify-center gap-3 lg:gap-5 font-semibold text-sm">
            <Link
              to="/"
              className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                isActive("/")
                  ? "text-[#2E7D32] bg-[#2E7D32]/10 font-bold"
                  : "text-gray-700 hover:text-[#2E7D32] hover:bg-gray-100/60"
              }`}
            >
              Home
            </Link>

            <Link
              to="/products"
              className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                isActive("/products")
                  ? "text-[#2E7D32] bg-[#2E7D32]/10 font-bold"
                  : "text-gray-700 hover:text-[#2E7D32] hover:bg-gray-100/60"
              }`}
            >
              Products
            </Link>

            {token && (
              <>
                <Link
                  to="/addProduct"
                  className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                    isActive("/addProduct")
                      ? "text-[#2E7D32] bg-[#2E7D32]/10 font-bold"
                      : "text-gray-700 hover:text-[#2E7D32] hover:bg-gray-100/60"
                  }`}
                >
                  Add Product
                </Link>
                <Link
                  to="/myProducts"
                  className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                    isActive("/myProducts")
                      ? "text-[#2E7D32] bg-[#2E7D32]/10 font-bold"
                      : "text-gray-700 hover:text-[#2E7D32] hover:bg-gray-100/60"
                  }`}
                >
                  My Products
                </Link>
                <Link
                  to="/welcome"
                  className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                    isActive("/welcome")
                      ? "text-[#2E7D32] bg-[#2E7D32]/10 font-bold"
                      : "text-gray-700 hover:text-[#2E7D32] hover:bg-gray-100/60"
                  }`}
                >
                  Dashboard
                </Link>
              </>
            )}
          </div>

          {/* Right: Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!token ? (
              <>
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-full border border-transparent font-semibold transition-all duration-200 ${
                    isActive("/login")
                      ? "text-[#2E7D32] bg-[#2E7D32]/10 font-bold border-[#2E7D32]/20"
                      : "text-gray-700 hover:text-[#2E7D32] hover:bg-gray-100/80"
                  }`}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-[#2E7D32] border-2 border-[#2E7D32] hover:bg-[#236327] hover:border-[#236327] text-white font-bold px-6 py-2 rounded-full shadow-md shadow-[#2E7D32]/25 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 text-sm"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <div
                  onClick={() => navigate("/mySwapRequests")}
                  className="relative cursor-pointer p-2 rounded-full text-gray-700 hover:text-[#2E7D32] hover:bg-gray-100/60 transition-colors"
                  title="Notifications"
                >
                  <FaBell className="text-xl" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                      {notificationCount}
                    </span>
                  )}
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition duration-200"
                >
                  <span>Logout</span>
                  <AiOutlineLogout className="text-base" />
                </button>
              </>
            )}
          </div>

        </nav>

        {/* Mobile Dropdown Drawer */}
        <div
          className={`fixed top-18 left-4 right-4 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-100 z-50 transition-all duration-300 transform md:hidden overflow-hidden ${
            isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="flex flex-col p-5 gap-3">
            
            {/* Home & Products Side-by-Side in Flex Row */}
            <div className="flex flex-row items-center justify-center gap-3 w-full">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={`flex-1 py-2.5 px-4 rounded-2xl border font-bold text-sm text-center transition-colors ${
                  isActive("/")
                    ? "bg-[#2E7D32]/10 border-[#2E7D32]/40 text-[#2E7D32]"
                    : "border-gray-200 text-gray-700 hover:border-[#2E7D32]/30"
                }`}
              >
                Home
              </Link>

              <Link
                to="/products"
                onClick={() => setIsOpen(false)}
                className={`flex-1 py-2.5 px-4 rounded-2xl border font-bold text-sm text-center transition-colors ${
                  isActive("/products")
                    ? "bg-[#2E7D32]/10 border-[#2E7D32]/40 text-[#2E7D32]"
                    : "border-gray-200 text-gray-700 hover:border-[#2E7D32]/30"
                }`}
              >
                Products
              </Link>
            </div>

            {!token ? (
              <div className="flex flex-col gap-2.5 mt-1 pt-3 border-t border-gray-100">
                {/* Login Button */}
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 px-4 rounded-2xl border-2 border-[#2E7D32] text-[#2E7D32] font-bold text-sm text-center hover:bg-[#2E7D32]/5 transition-colors shadow-xs"
                >
                  Login
                </Link>

                {/* Register Button */}
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 px-4 rounded-2xl bg-[#2E7D32] border-2 border-[#2E7D32] text-white font-bold text-sm text-center shadow-md shadow-[#2E7D32]/25 hover:bg-[#236327] hover:border-[#236327] transition-colors"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                <Link
                  to="/addProduct"
                  onClick={() => setIsOpen(false)}
                  className={`py-2.5 px-4 rounded-2xl font-bold text-sm text-center border ${
                    isActive("/addProduct") ? "bg-[#2E7D32]/10 border-[#2E7D32]/40 text-[#2E7D32]" : "border-gray-200 text-gray-700"
                  }`}
                >
                  Add Product
                </Link>

                <Link
                  to="/myProducts"
                  onClick={() => setIsOpen(false)}
                  className={`py-2.5 px-4 rounded-2xl font-bold text-sm text-center border ${
                    isActive("/myProducts") ? "bg-[#2E7D32]/10 border-[#2E7D32]/40 text-[#2E7D32]" : "border-gray-200 text-gray-700"
                  }`}
                >
                  My Products
                </Link>

                <Link
                  to="/welcome"
                  onClick={() => setIsOpen(false)}
                  className={`py-2.5 px-4 rounded-2xl font-bold text-sm text-center border ${
                    isActive("/welcome") ? "bg-[#2E7D32]/10 border-[#2E7D32]/40 text-[#2E7D32]" : "border-gray-200 text-gray-700"
                  }`}
                >
                  Dashboard
                </Link>

                <div
                  onClick={() => {
                    navigate("/mySwapRequests");
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 cursor-pointer"
                >
                  <FaBell className="text-lg text-[#2E7D32]" />
                  <span>Notifications</span>
                  {notificationCount > 0 && (
                    <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2.5 px-4 rounded-2xl font-bold text-sm transition mt-1"
                >
                  <span>Logout</span>
                  <AiOutlineLogout className="text-lg" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;