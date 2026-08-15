import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { AiOutlineLogout } from "react-icons/ai";
import { FaBell } from "react-icons/fa";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import axios from "../utils/axiosInstance";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const token = localStorage.getItem("token");

  // Notifications states
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    setIsOpen(false);
    setShowNotifDropdown(false);
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("/notifications");
      setNotifications(response.data);
      const unread = response.data.filter((n) => !n.isRead).length;
      setUnreadCount(unread);
    } catch (error) {
      console.log("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchNotifications();
    }
  }, [token]);

  // Real-time socket notification listener
  useEffect(() => {
    if (!token || !currentUser?._id) return;

    const socketHost = typeof window !== "undefined" ? window.location.hostname : "localhost";
    const socketUrl = `http://${socketHost}:5000`;
    const socket = io(socketUrl);

    socket.on("connect", () => {
      socket.emit("joinUser", currentUser._id);
    });

    socket.on("newNotification", (newNotif) => {
      setNotifications((prev) => [newNotif, ...prev]);
      setUnreadCount((prev) => prev + 1);
      toast.success(newNotif.message, { icon: "🔔" });
    });

    return () => {
      socket.disconnect();
    };
  }, [token, currentUser?._id]);

  // Close notifications dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      const isClickOnBell = e.target.closest(".bell-btn-trigger");
      const isClickInsideDropdown = e.target.closest(".notif-dropdown-panel");
      if (!isClickOnBell && !isClickInsideDropdown) {
        setShowNotifDropdown(false);
      }
    };
    if (showNotifDropdown) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showNotifDropdown]);

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

  const handleNotifClick = async (notif) => {
    if (!notif.isRead) {
      try {
        await axios.put(`/notifications/${notif._id}/read`);
        setNotifications((prev) =>
          prev.map((n) => (n._id === notif._id ? { ...n, isRead: true } : n))
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      } catch (err) {
        console.error("Error marking notification as read:", err);
      }
    }

    setShowNotifDropdown(false);

    if (notif.type === "new_swap_request") {
      navigate("/swapRequest");
    } else if (notif.type === "swap_accepted" || notif.type === "swap_rejected") {
      navigate("/mySwapRequests");
    } else if (notif.type === "new_chat_message") {
      navigate("/chat", { state: { activeChatId: notif.relatedId } });
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await axios.put("/notifications/read-all");
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
      toast.success("All notifications marked as read");
    } catch (err) {
      console.error("Error marking all notifications as read:", err);
      toast.error("Failed to mark all as read");
    }
  };

  const formatTimeAgo = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) return "Just now";
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

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
                  className="bg-[#2E7D32] border-2 border-[#2E7D32] hover:bg-[#236327] hover:border-[#236327] text-white font-bold px-6 py-2 rounded-full shadow-md shadow-[#2E7D32]/25 hover:scale-105 active:scale-95 transition-all duration-200 text-sm"
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

                <Link
                  to="/chat"
                  className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${isActive("/chat")
                      ? "text-[#2E7D32] bg-[#2E7D32]/10 font-bold"
                      : "text-gray-700 hover:text-[#2E7D32] hover:bg-gray-100/60"
                    }`}
                >
                  Chat
                </Link>

                <div
                  onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                  className="relative cursor-pointer p-2 rounded-full text-gray-700 hover:text-[#2E7D32] hover:bg-gray-100/60 transition-colors bell-btn-trigger"
                  title="Notifications"
                >
                  <FaBell className="text-xl" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                      {unreadCount}
                    </span>
                  )}
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition duration-200 cursor-pointer"
                >
                  <span>Logout</span>
                  <AiOutlineLogout className="text-base" />
                </button>
              </>
            )}
          </div>

          {/* Premium Notifications Dropdown Panel (Responsive) */}
          {showNotifDropdown && (
            <div className="absolute right-4 md:right-16 top-16 w-[calc(100vw-32px)] sm:w-80 max-h-[420px] overflow-y-auto bg-white/95 backdrop-blur-md border border-gray-150 rounded-2xl shadow-xl z-50 p-3 flex flex-col gap-2 select-none animate-fade-in text-left notif-dropdown-panel">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-1">
                <span className="font-extrabold text-sm text-gray-800 flex items-center gap-1.5">
                  🔔 Notifications
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-[11px] font-bold text-[#2E7D32] hover:underline cursor-pointer"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              {notifications.length === 0 ? (
                <div className="text-center py-6 text-gray-400 text-xs font-semibold">
                  No notifications yet
                </div>
              ) : (
                <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[340px]">
                  {notifications.map((notif) => (
                    <div
                      key={notif._id}
                      onClick={() => handleNotifClick(notif)}
                      className={`p-2.5 rounded-xl flex gap-2.5 cursor-pointer transition-colors border ${
                        !notif.isRead
                          ? "bg-emerald-50/40 border-emerald-100 hover:bg-emerald-50/80"
                          : "bg-white border-transparent hover:bg-gray-50"
                      }`}
                    >
                      {/* Icon badge */}
                      <div className="shrink-0 w-8.5 h-8.5 rounded-full flex items-center justify-center border shadow-3xs bg-white text-base">
                        {notif.type === "new_swap_request" && "🔄"}
                        {notif.type === "swap_accepted" && "✅"}
                        {notif.type === "swap_rejected" && "❌"}
                        {notif.type === "new_chat_message" && "💬"}
                      </div>

                      <div className="flex-1 min-w-0 text-left">
                        <p className={`text-xs text-gray-850 leading-snug break-words ${!notif.isRead ? "font-bold" : "font-medium"}`}>
                          {notif.message}
                        </p>
                        <span className="text-[10px] text-gray-400 font-bold block mt-1">
                          {formatTimeAgo(notif.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

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
                      setShowNotifDropdown(!showNotifDropdown);
                      setIsOpen(false);
                    }}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl border transition-colors cursor-pointer bell-btn-trigger ${showNotifDropdown ? "bg-[#2E7D32]/10 border-[#2E7D32]/40 text-[#2E7D32]" : "border-gray-200 text-gray-700 hover:border-[#2E7D32]/30"}`}
                  >
                    <FaBell className="text-base text-[#2E7D32]" />
                    <span className="font-bold text-sm">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 3: Chat */}
                <div className="flex flex-row items-center justify-center gap-3 w-full">
                  <Link
                    to="/chat"
                    onClick={() => setIsOpen(false)}
                    className={`flex-1 py-2.5 px-3 rounded-2xl font-bold text-sm text-center border transition-colors ${isActive("/chat") ? "bg-[#2E7D32]/10 border-[#2E7D32]/40 text-[#2E7D32]" : "border-gray-200 text-gray-700 hover:border-[#2E7D32]/30"}`}
                  >
                    Chat
                  </Link>
                </div>

                {/* Row 4: Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2.5 px-4 rounded-2xl font-bold text-sm transition mt-1 shadow-xs cursor-pointer"
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