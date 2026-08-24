import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaBoxOpen, FaExchangeAlt, FaPlusCircle, FaUserCircle, FaCheckCircle, FaTimesCircle, FaHeart, FaShieldAlt } from "react-icons/fa";
import axios from "../utils/axiosInstance";

const MotionLink = motion(Link);

const Welcome = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const hoverShadowGreen = "0px 20px 40px rgba(46,125,50,0.18)";
  const hoverShadowOrange = "0px 20px 40px rgba(244,162,97,0.18)";
  const hoverShadowEmerald = "0px 20px 40px rgba(16,185,129,0.18)";
  const hoverShadowRed = "0px 20px 40px rgba(239,68,68,0.18)";

  const [currentSlide, setCurrentSlide] = useState(0);

  const [stats, setStats] = useState({
    products: 0,
    requests: 0,
    accepted: 0,
    rejected: 0
  });

  const getStats = async () => {
    try {
      const [productsRes, requestsRes] = await Promise.all([
        axios.get("/myProducts"),
        axios.get("/getSwapRequest")
      ]);

      const requests = requestsRes.data;
      const pendingCount = requests.filter(r => r.status === "pending").length;
      const acceptedCount = requests.filter(r => r.status === "accepted").length;
      const rejectedCount = requests.filter(r => r.status === "rejected").length;

      setStats({
        products: productsRes.data.length,
        requests: pendingCount,
        accepted: acceptedCount,
        rejected: rejectedCount
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  const slides = [
    {
      id: 0,
      badge: "Dashboard Overview",
      title: `Welcome Back, ${user?.name || "User"}!`,
      subtitle: "Manage your products, swap requests and profile from one beautiful dashboard.",
      bg: "from-[#2E7D32] via-[#256728] to-[#1E5621] border-emerald-600/30 shadow-[#2E7D32]/15",
      btn1Text: "Add Product",
      btn1Link: "/addProduct",
      btn1Color: "text-[#2E7D32] hover:bg-emerald-50 shadow-emerald-950/25",
      btn2Text: "Browse Products",
      btn2Link: "/products",
      btn2Color: "hover:text-[#2E7D32]",
      hasPlusIcon: true
    },
    {
      id: 1,
      badge: "Marketplace Highlights",
      title: "Discover Your Next Match!",
      subtitle: "Exchange your books, mobiles, electronics, or gaming consoles with members in the community.",
      bg: "from-[#F4A261] via-[#E76F51] to-[#D97706] border-orange-500/30 shadow-[#F4A261]/15",
      btn1Text: "Browse Items",
      btn1Link: "/products",
      btn1Color: "text-[#D97706] hover:bg-orange-50 shadow-amber-950/25",
      btn2Text: "View My Inventory",
      btn2Link: "/myProducts",
      btn2Color: "hover:text-[#D97706]",
      hasPlusIcon: false
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 3500); // Rotates every 3.5 seconds for readability and snappy feel
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-[85vh] bg-gray-50/60 py-8 sm:py-12 px-4">
      <div className="w-[92%] max-w-6xl mx-auto space-y-8 sm:space-y-12">

        {/* Top Banner Slider Section */}
        <div className="relative w-full overflow-hidden rounded-3xl">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`relative overflow-hidden bg-gradient-to-r ${slides[currentSlide].bg} rounded-3xl p-6 sm:p-10 text-white shadow-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-6 w-full`}
            >
              {/* Subtle Ambient Light Orb */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none animate-pulse" />

              <div className="relative z-10 flex-1">
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/15 text-emerald-100 border border-white/20 mb-3 shadow-xs">
                  {slides[currentSlide].badge}
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                  {slides[currentSlide].title}
                </h1>
                <p className="mt-2 text-sm sm:text-base md:text-lg text-emerald-100/90 max-w-xl font-medium leading-relaxed">
                  {slides[currentSlide].subtitle}
                </p>
              </div>

              <div className="relative z-10 shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4 sm:mt-0 w-full sm:w-auto">
                <Link
                  to={slides[currentSlide].btn1Link}
                  className={`relative group inline-flex items-center justify-center font-bold px-5 py-2.5 sm:py-3.5 rounded-full bg-white border-2 border-transparent shadow-md hover:shadow-xl hover:-translate-y-0.5 hover:scale-105 active:scale-95 transition-all duration-300 ease-out text-xs sm:text-base whitespace-nowrap cursor-pointer w-full sm:w-auto ${slides[currentSlide].btn1Color}`}
                >
                  {slides[currentSlide].hasPlusIcon && (
                    <FaPlusCircle className="mr-1.5 sm:mr-2 text-xs sm:text-lg text-[#2E7D32]" />
                  )}
                  <span>{slides[currentSlide].btn1Text}</span>
                </Link>

                <Link
                  to={slides[currentSlide].btn2Link}
                  className={`relative group inline-flex items-center justify-center font-bold text-white px-5 py-2.5 sm:py-3.5 rounded-full bg-white/10 border-2 border-white/80 backdrop-blur-xs shadow-md hover:shadow-xl hover:-translate-y-0.5 hover:scale-105 active:scale-95 transition-all duration-300 ease-out text-xs sm:text-base whitespace-nowrap cursor-pointer w-full sm:w-auto ${slides[currentSlide].btn2Color}`}
                >
                  <span>{slides[currentSlide].btn2Text}</span>
                  <span className="ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Quick Actions Cards Section */}
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 sm:mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
            {/* Add Product */}
            <MotionLink
              to="/addProduct"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0 }}
              whileHover={{
                y: -10,
                boxShadow: hoverShadowGreen,
              }}
              className="group relative bg-white border border-gray-100 border-t-4 border-t-[#2E7D32] shadow-md transition-colors duration-300 p-4 sm:p-5 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center gap-2 sm:gap-3 text-center h-full min-h-[150px] sm:min-h-[180px] overflow-hidden cursor-pointer"
            >
              <div className="p-2.5 sm:p-3.5 rounded-2xl bg-[#2E7D32]/10 text-[#2E7D32] group-hover:bg-[#2E7D32] group-hover:text-white transition-all duration-300 ease-out">
                <FaPlusCircle className="text-2xl sm:text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-gray-800 group-hover:text-[#2E7D32] transition-colors leading-tight">
                  Add Product
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-tight">
                  Upload new item
                </p>
              </div>
            </MotionLink>

            {/* My Products */}
            <MotionLink
              to="/myProducts"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              whileHover={{
                y: -10,
                boxShadow: hoverShadowOrange,
              }}
              className="group relative bg-white border border-gray-100 border-t-4 border-t-[#F4A261] shadow-md transition-colors duration-300 p-4 sm:p-5 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center gap-2 sm:gap-3 text-center h-full min-h-[150px] sm:min-h-[180px] overflow-hidden cursor-pointer"
            >
              <div className="p-2.5 sm:p-3.5 rounded-2xl bg-[#F4A261]/15 text-[#F4A261] group-hover:bg-[#F4A261] group-hover:text-white transition-all duration-300 ease-out">
                <FaBoxOpen className="text-2xl sm:text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-gray-800 group-hover:text-[#F4A261] transition-colors leading-tight">
                  My Products
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-tight">
                  Manage listings
                </p>
              </div>
            </MotionLink>

            {/* Swap Requests */}
            <MotionLink
              to="/swapRequest"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              whileHover={{
                y: -10,
                boxShadow: hoverShadowGreen,
              }}
              className="group relative bg-white border border-gray-100 border-t-4 border-t-[#2E7D32] shadow-md transition-colors duration-300 p-4 sm:p-5 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center gap-2 sm:gap-3 text-center h-full min-h-[150px] sm:min-h-[180px] overflow-hidden cursor-pointer"
            >
              <div className="p-2.5 sm:p-3.5 rounded-2xl bg-[#2E7D32]/10 text-[#2E7D32] group-hover:bg-[#2E7D32] group-hover:text-white transition-all duration-300 ease-out">
                <FaExchangeAlt className="text-2xl sm:text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-gray-800 group-hover:text-[#2E7D32] transition-colors leading-tight">
                  Swap Requests
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-tight">
                  View requests
                </p>
              </div>
            </MotionLink>

            {/* My Wishlist */}
            <MotionLink
              to="/wishlist"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
              whileHover={{
                y: -10,
                boxShadow: hoverShadowRed,
              }}
              className="group relative bg-white border border-gray-100 border-t-4 border-t-red-500 shadow-md transition-colors duration-300 p-4 sm:p-5 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center gap-2 sm:gap-3 text-center h-full min-h-[150px] sm:min-h-[180px] overflow-hidden cursor-pointer"
            >
              <div className="p-2.5 sm:p-3.5 rounded-2xl bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-300 ease-out">
                <FaHeart className="text-2xl sm:text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-gray-800 group-hover:text-red-500 transition-colors leading-tight">
                  My Wishlist
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-tight">
                  Saved items
                </p>
              </div>
            </MotionLink>

            {/* Profile */}
            <MotionLink
              to="/profile"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              whileHover={{
                y: -10,
                boxShadow: hoverShadowOrange,
              }}
              className="group relative bg-white border border-gray-100 border-t-4 border-t-[#F4A261] shadow-md transition-colors duration-300 p-4 sm:p-5 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center gap-2 sm:gap-3 text-center h-full min-h-[150px] sm:min-h-[180px] overflow-hidden cursor-pointer"
            >
              <div className="p-2.5 sm:p-3.5 rounded-2xl bg-[#F4A261]/15 text-[#F4A261] group-hover:bg-[#F4A261] group-hover:text-white transition-all duration-300 ease-out">
                <FaUserCircle className="text-2xl sm:text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-gray-800 group-hover:text-[#F4A261] transition-colors leading-tight">
                  Profile
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-tight">
                  Manage account
                </p>
              </div>
            </MotionLink>

            {/* Admin Control Panel (Visible for Admin Users) */}
            {(user?.email === "amanarandiya@gmail.com" || user?.role === "admin") && (
              <MotionLink
                to="/admin"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                whileHover={{
                  y: -10,
                  boxShadow: "0px 20px 40px rgba(147,51,234,0.2)",
                }}
                className="group relative bg-purple-50/50 border border-purple-200 border-t-4 border-t-purple-600 shadow-md transition-colors duration-300 p-4 sm:p-5 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center gap-2 sm:gap-3 text-center h-full min-h-[150px] sm:min-h-[180px] overflow-hidden cursor-pointer"
              >
                <div className="p-2.5 sm:p-3.5 rounded-2xl bg-purple-600 text-white shadow-md shadow-purple-600/30 group-hover:scale-110 transition-all duration-300 ease-out">
                  <FaShieldAlt className="text-2xl sm:text-3xl group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-purple-900 leading-tight">
                    Admin Portal
                  </h3>
                  <p className="text-[11px] sm:text-xs text-purple-700 font-semibold mt-0.5 leading-tight">
                    Reports & Control
                  </p>
                </div>
              </MotionLink>
            )}
          </div>
        </div>

        {/* Stats Counter Section */}
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 sm:mb-6">
            Activity Overview
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
            {/* Products Listed */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0 }}
              whileHover={{
                y: -10,
                boxShadow: hoverShadowGreen
              }}
              className="group relative bg-white border border-gray-100 border-t-4 border-t-[#2E7D32] shadow-md transition-colors duration-300 p-4 sm:p-5 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center gap-2 sm:gap-3 text-center h-full min-h-[150px] sm:min-h-[180px] overflow-hidden"
            >
              <div className="p-2.5 sm:p-3.5 rounded-2xl bg-[#2E7D32]/10 text-[#2E7D32] group-hover:bg-[#2E7D32] group-hover:text-white transition-all duration-300 ease-out">
                <FaBoxOpen className="text-2xl sm:text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-[#2E7D32] leading-tight">
                  {stats.products}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-0.5">
                  Products Listed
                </p>
              </div>
            </motion.div>

            {/* Swap Requests */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              whileHover={{
                y: -10,
                boxShadow: hoverShadowOrange
              }}
              className="group relative bg-white border border-gray-100 border-t-4 border-t-[#F4A261] shadow-md transition-colors duration-300 p-4 sm:p-5 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center gap-2 sm:gap-3 text-center h-full min-h-[150px] sm:min-h-[180px] overflow-hidden"
            >
              <div className="p-2.5 sm:p-3.5 rounded-2xl bg-[#F4A261]/15 text-[#F4A261] group-hover:bg-[#F4A261] group-hover:text-white transition-all duration-300 ease-out">
                <FaExchangeAlt className="text-2xl sm:text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-[#F4A261] leading-tight">
                  {stats.requests}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-0.5">
                  Swap Requests
                </p>
              </div>
            </motion.div>

            {/* Accepted Swaps */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              whileHover={{
                y: -10,
                boxShadow: hoverShadowEmerald
              }}
              className="group relative bg-white border border-gray-100 border-t-4 border-t-emerald-500 shadow-md transition-colors duration-300 p-4 sm:p-5 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center gap-2 sm:gap-3 text-center h-full min-h-[150px] sm:min-h-[180px] overflow-hidden"
            >
              <div className="p-2.5 sm:p-3.5 rounded-2xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 ease-out">
                <FaCheckCircle className="text-2xl sm:text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-emerald-600 leading-tight">
                  {stats.accepted}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-0.5">
                  Accepted Swaps
                </p>
              </div>
            </motion.div>

            {/* Rejected Swaps */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              whileHover={{
                y: -10,
                boxShadow: hoverShadowRed
              }}
              className="group relative bg-white border border-gray-100 border-t-4 border-t-red-500 shadow-md transition-colors duration-300 p-4 sm:p-5 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center gap-2 sm:gap-3 text-center h-full min-h-[150px] sm:min-h-[180px] overflow-hidden"
            >
              <div className="p-2.5 sm:p-3.5 rounded-2xl bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-300 ease-out">
                <FaTimesCircle className="text-2xl sm:text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-red-500 leading-tight">
                  {stats.rejected}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-0.5">
                  Rejected Swaps
                </p>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Welcome;