import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { AiOutlineLogout } from "react-icons/ai";
import { FaBell } from "react-icons/fa";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import axios from "../utils/axiosInstance";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  // Window scroll listener for dynamic top space animation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

      {/* Dynamic Animated Scroll Header Container */}
      <header
        className={`fixed left-0 right-0 z-50 w-full flex justify-center transition-all duration-300 ${scrolled ? "top-0 px-0 py-0" : "top-2 sm:top-4 px-2.5 sm:px-4"
          }`}
      >
        <nav
          className={`h-15 sm:h-16 flex items-center justify-between transition-all duration-300 ${scrolled
              ? "w-full max-w-full rounded-none px-6 sm:px-12 md:px-16 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100"
              : "w-[98%] sm:w-[95%] max-w-6xl rounded-full px-4 sm:px-8 md:px-10 bg-white/90 backdrop-blur-md shadow-lg shadow-gray-200/50 border border-gray-100"
            }`}
        >
          {/* Logo Area */}
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

          {/* Desktop Nav Links & Action Buttons Together */}
          <div className="hidden md:flex items-center gap-6 lg:gap-3 font-semibold text-sm">
            <Link
              to="/"
              className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${isActive("/")
                  ? "text-[#2E7D32] bg-[#2E7D32]/10 font-bold"
                  : "text-gray-700 hover:text-[#2E7D32] hover:bg-gray-100/60"
                }`}
            >
              Home
            </Link>

            <Link
              to="/products"
              className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${isActive("/products")
                  ? "text-[#2E7D32] bg-[#2E7D32]/10 font-bold"
                  : "text-gray-700 hover:text-[#2E7D32] hover:bg-gray-100/60"
                }`}
            >
              Products
            </Link>

            {!token ? (
              <>
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-full border border-transparent transition-all duration-200 ${isActive("/login")
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
                <Link
                  to="/addProduct"
                  className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${isActive("/addProduct")
                      ? "text-[#2E7D32] bg-[#2E7D32]/10 font-bold"
                      : "text-gray-700 hover:text-[#2E7D32] hover:bg-gray-100/60"
                    }`}
                >
                  Add Product
                </Link>
                <Link
                  to="/myProducts"
                  className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${isActive("/myProducts")
                      ? "text-[#2E7D32] bg-[#2E7D32]/10 font-bold"
                      : "text-gray-700 hover:text-[#2E7D32] hover:bg-gray-100/60"
                    }`}
                >
                  My Products
                </Link>
                <Link
                  to="/welcome"
                  className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${isActive("/welcome")
                      ? "text-[#2E7D32] bg-[#2E7D32]/10 font-bold"
                      : "text-gray-700 hover:text-[#2E7D32] hover:bg-gray-100/60"
                    }`}
                >
                  Dashboard
                </Link>

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
          className={`fixed left-4 right-4 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-100 z-50 transition-all duration-300 transform md:hidden overflow-hidden ${scrolled ? "top-17" : "top-19"
            } ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
            }`}
        >
          <div className="flex flex-col p-5 gap-3">

            {/* Home & Products Side-by-Side in Flex Row */}
            <div className="flex flex-row items-center justify-center gap-3 w-full">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={`flex-1 py-2.5 px-4 rounded-2xl border font-bold text-sm text-center transition-colors ${isActive("/")
                    ? "bg-[#2E7D32]/10 border-[#2E7D32]/40 text-[#2E7D32]"
                    : "border-gray-200 text-gray-700 hover:border-[#2E7D32]/30"
                  }`}
              >
                Home
              </Link>

              <Link
                to="/products"
                onClick={() => setIsOpen(false)}
                className={`flex-1 py-2.5 px-4 rounded-2xl border font-bold text-sm text-center transition-colors ${isActive("/products")
                    ? "bg-[#2E7D32]/10 border-[#2E7D32]/40 text-[#2E7D32]"
                    : "border-gray-200 text-gray-700 hover:border-[#2E7D32]/30"
                  }`}
              >
                Products
              </Link>
            </div>

            {!token ? (
              <div className="flex flex-row items-center justify-center gap-3 w-full mt-1 pt-3 border-t border-gray-100">
                {/* Login Button */}
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className={`flex-1 py-2.5 px-4 rounded-2xl border-2 border-[#2E7D32] text-[#2E7D32] font-bold text-sm text-center hover:bg-[#2E7D32]/5 transition-colors shadow-xs ${isActive("/login") ? "bg-[#2E7D32]/10" : ""}`}
                >
                  Login
                </Link>

                {/* Register Button */}
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-2.5 px-4 rounded-2xl bg-[#2E7D32] border-2 border-[#2E7D32] text-white font-bold text-sm text-center shadow-md shadow-[#2E7D32]/25 hover:bg-[#236327] hover:border-[#236327] transition-colors"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5 pt-2 border-t border-gray-100">
                {/* Row 1: Add Product & My Products */}
                <div className="flex flex-row items-center justify-center gap-3 w-full">
                  <Link
                    to="/addProduct"
                    onClick={() => setIsOpen(false)}
                    className={`flex-1 py-2.5 px-3 rounded-2xl font-bold text-sm text-center border transition-colors ${isActive("/addProduct") ? "bg-[#2E7D32]/10 border-[#2E7D32]/40 text-[#2E7D32]" : "border-gray-200 text-gray-700 hover:border-[#2E7D32]/30"}`}
                  >
                    Add Product
                  </Link>

                  <Link
                    to="/myProducts"
                    onClick={() => setIsOpen(false)}
                    className={`flex-1 py-2.5 px-3 rounded-2xl font-bold text-sm text-center border transition-colors ${isActive("/myProducts") ? "bg-[#2E7D32]/10 border-[#2E7D32]/40 text-[#2E7D32]" : "border-gray-200 text-gray-700 hover:border-[#2E7D32]/30"}`}
                  >
                    My Products
                  </Link>
                </div>

                {/* Row 2: Dashboard & Notifications */}
                <div className="flex flex-row items-center justify-center gap-3 w-full">
                  <Link
                    to="/welcome"
                    onClick={() => setIsOpen(false)}
                    className={`flex-1 py-2.5 px-3 rounded-2xl font-bold text-sm text-center border transition-colors ${isActive("/welcome") ? "bg-[#2E7D32]/10 border-[#2E7D32]/40 text-[#2E7D32]" : "border-gray-200 text-gray-700 hover:border-[#2E7D32]/30"}`}
                  >
                    Dashboard
                  </Link>

                  <div
                    onClick={() => {
                      navigate("/mySwapRequests");
                      setIsOpen(false);
                    }}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl border transition-colors cursor-pointer ${isActive("/mySwapRequests") ? "bg-[#2E7D32]/10 border-[#2E7D32]/40 text-[#2E7D32]" : "border-gray-200 text-gray-700 hover:border-[#2E7D32]/30"}`}
                  >
                    <FaBell className="text-base text-[#2E7D32]" />
                    <span className="font-bold text-sm">Requests</span>
                    {notificationCount > 0 && (
                      <span className="bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                        {notificationCount}
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 3: Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2.5 px-4 rounded-2xl font-bold text-sm transition mt-1 shadow-xs"
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