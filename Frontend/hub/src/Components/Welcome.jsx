import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBoxOpen, FaExchangeAlt, FaPlusCircle, FaUserCircle, FaCheckCircle, FaTimesCircle, } from "react-icons/fa";

const Welcome = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <section className="min-h-[85vh] bg-gray-50/60 py-8 sm:py-12 px-4">
      <div className="w-[92%] max-w-6xl mx-auto space-y-8 sm:space-y-12">

        {/* Top Banner Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden bg-gradient-to-r from-[#2E7D32] via-[#256728] to-[#1E5621] rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-[#2E7D32]/15 border border-emerald-600/30"
        >
          {/* Subtle Ambient Light Orb */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/15 text-emerald-100 border border-white/20 mb-3 shadow-xs">
              Dashboard Overview
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Welcome Back, {user?.name || "User"}!
            </h1>
            <p className="mt-2 sm:mt-3 text-sm sm:text-lg text-emerald-100/90 max-w-2xl font-medium leading-relaxed">
              Manage your products, swap requests and profile from one beautiful dashboard.
            </p>

            <div className="flex flex-row items-center gap-2 sm:gap-4 mt-5 sm:mt-8 flex-nowrap">
              <Link
                to="/addProduct"
                className="relative group inline-flex items-center justify-center font-bold text-[#2E7D32] px-3 sm:px-7 py-2 sm:py-3 rounded-full bg-white border-2 border-transparent hover:bg-emerald-50 shadow-md hover:shadow-xl hover:-translate-y-0.5 hover:scale-105 active:scale-95 transition-all duration-200 text-[11px] sm:text-base whitespace-nowrap"
              >
                <FaPlusCircle className="mr-1.5 sm:mr-2 text-xs sm:text-lg text-[#2E7D32]" />
                <span>Add Product</span>
              </Link>

              <Link
                to="/products"
                className="relative group inline-flex items-center justify-center font-bold text-white px-3 sm:px-7 py-2 sm:py-3 rounded-full bg-white/10 hover:bg-white hover:text-[#2E7D32] border-2 border-white/80 backdrop-blur-xs shadow-md hover:shadow-xl hover:-translate-y-0.5 hover:scale-105 active:scale-95 transition-all duration-200 text-[11px] sm:text-base whitespace-nowrap"
              >
                <span>Browse Products</span>
                <span className="ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions Cards Section */}
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 sm:mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
            {/* Add Product */}
            <Link
              to="/addProduct"
              className="group relative bg-white border border-gray-100 border-t-4 border-t-[#2E7D32] shadow-md hover:shadow-2xl hover:shadow-[#2E7D32]/15 p-4 sm:p-5 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center gap-2 sm:gap-3 text-center h-full min-h-[150px] sm:min-h-[180px] hover:-translate-y-1.5 active:scale-95 transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div className="p-2.5 sm:p-3.5 rounded-2xl bg-[#2E7D32]/10 text-[#2E7D32] group-hover:bg-[#2E7D32] group-hover:text-white transition-colors duration-300">
                <FaPlusCircle className="text-2xl sm:text-3xl" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 group-hover:text-[#2E7D32] transition-colors leading-tight">
                  Add Product
                </h3>
                <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-0.5 leading-tight">
                  Upload new item
                </p>
              </div>
            </Link>

            {/* My Products */}
            <Link
              to="/myProducts"
              className="group relative bg-white border border-gray-100 border-t-4 border-t-[#F4A261] shadow-md hover:shadow-2xl hover:shadow-[#F4A261]/15 p-4 sm:p-5 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center gap-2 sm:gap-3 text-center h-full min-h-[150px] sm:min-h-[180px] hover:-translate-y-1.5 active:scale-95 transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div className="p-2.5 sm:p-3.5 rounded-2xl bg-[#F4A261]/15 text-[#F4A261] group-hover:bg-[#F4A261] group-hover:text-white transition-colors duration-300">
                <FaBoxOpen className="text-2xl sm:text-3xl" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 group-hover:text-[#F4A261] transition-colors leading-tight">
                  My Products
                </h3>
                <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-0.5 leading-tight">
                  Manage listings
                </p>
              </div>
            </Link>

            {/* Swap Requests */}
            <Link
              to="/mySwapRequests"
              className="group relative bg-white border border-gray-100 border-t-4 border-t-[#2E7D32] shadow-md hover:shadow-2xl hover:shadow-[#2E7D32]/15 p-4 sm:p-5 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center gap-2 sm:gap-3 text-center h-full min-h-[150px] sm:min-h-[180px] hover:-translate-y-1.5 active:scale-95 transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div className="p-2.5 sm:p-3.5 rounded-2xl bg-[#2E7D32]/10 text-[#2E7D32] group-hover:bg-[#2E7D32] group-hover:text-white transition-colors duration-300">
                <FaExchangeAlt className="text-2xl sm:text-3xl" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 group-hover:text-[#2E7D32] transition-colors leading-tight">
                  Swap Requests
                </h3>
                <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-0.5 leading-tight">
                  View requests
                </p>
              </div>
            </Link>

            {/* Profile */}
            <Link
              to="/profile"
              className="group relative bg-white border border-gray-100 border-t-4 border-t-[#F4A261] shadow-md hover:shadow-2xl hover:shadow-[#F4A261]/15 p-4 sm:p-5 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center gap-2 sm:gap-3 text-center h-full min-h-[150px] sm:min-h-[180px] hover:-translate-y-1.5 active:scale-95 transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div className="p-2.5 sm:p-3.5 rounded-2xl bg-[#F4A261]/15 text-[#F4A261] group-hover:bg-[#F4A261] group-hover:text-white transition-colors duration-300">
                <FaUserCircle className="text-2xl sm:text-3xl" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 group-hover:text-[#F4A261] transition-colors leading-tight">
                  Profile
                </h3>
                <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-0.5 leading-tight">
                  Manage account
                </p>
              </div>
            </Link>
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative bg-white border border-gray-100 border-t-4 border-t-[#2E7D32] shadow-md hover:shadow-2xl hover:shadow-[#2E7D32]/15 p-4 sm:p-5 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center gap-2 sm:gap-3 text-center h-full min-h-[150px] sm:min-h-[180px] transition-all duration-300 overflow-hidden"
            >
              <div className="p-2.5 sm:p-3.5 rounded-2xl bg-[#2E7D32]/10 text-[#2E7D32] group-hover:bg-[#2E7D32] group-hover:text-white transition-colors duration-300">
                <FaBoxOpen className="text-2xl sm:text-3xl" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-[#2E7D32] leading-tight">
                  0
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-0.5">
                  Products Listed
                </p>
              </div>
            </motion.div>

            {/* Swap Requests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.05 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative bg-white border border-gray-100 border-t-4 border-t-[#F4A261] shadow-md hover:shadow-2xl hover:shadow-[#F4A261]/15 p-4 sm:p-5 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center gap-2 sm:gap-3 text-center h-full min-h-[150px] sm:min-h-[180px] transition-all duration-300 overflow-hidden"
            >
              <div className="p-2.5 sm:p-3.5 rounded-2xl bg-[#F4A261]/15 text-[#F4A261] group-hover:bg-[#F4A261] group-hover:text-white transition-colors duration-300">
                <FaExchangeAlt className="text-2xl sm:text-3xl" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-[#F4A261] leading-tight">
                  0
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-0.5">
                  Swap Requests
                </p>
              </div>
            </motion.div>

            {/* Accepted Swaps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative bg-white border border-gray-100 border-t-4 border-t-emerald-500 shadow-md hover:shadow-2xl hover:shadow-emerald-500/15 p-4 sm:p-5 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center gap-2 sm:gap-3 text-center h-full min-h-[150px] sm:min-h-[180px] transition-all duration-300 overflow-hidden"
            >
              <div className="p-2.5 sm:p-3.5 rounded-2xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <FaCheckCircle className="text-2xl sm:text-3xl" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-emerald-600 leading-tight">
                  0
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-0.5">
                  Accepted Swaps
                </p>
              </div>
            </motion.div>

            {/* Rejected Swaps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.15 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative bg-white border border-gray-100 border-t-4 border-t-red-500 shadow-md hover:shadow-2xl hover:shadow-red-500/15 p-4 sm:p-5 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center gap-2 sm:gap-3 text-center h-full min-h-[150px] sm:min-h-[180px] transition-all duration-300 overflow-hidden"
            >
              <div className="p-2.5 sm:p-3.5 rounded-2xl bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
                <FaTimesCircle className="text-2xl sm:text-3xl" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-red-500 leading-tight">
                  0
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