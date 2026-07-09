import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBoxOpen, FaExchangeAlt, FaPlusCircle, FaUserCircle, FaCheckCircle, FaTimesCircle, } from "react-icons/fa";

const Welcome = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <section className="min-h-[85vh] bg-gray-50 py-10 px-4">
      <div className="w-[90%] max-w-6xl mx-auto">

        {/* top section  */}

        <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-[#2E7D32] to-[#43A047] rounded-3xl p-8 md:p-10 text-white shadow-lg">
          <h1 className="text-3xl md:text-5xl font-bold"> Welcome Back, {user?.name} </h1>
          <p className="mt-4 text-lg text-green-100 max-w-2xl">
            Manage your products, swap requests and profile from one beautiful dashboard. </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              to="/addProduct"
              className="bg-white text-[#2E7D32] px-7 py-3 rounded-full font-semibold hover:scale-105 transition"
            >
              + Add Product
            </Link>

            <Link
              to="/products"
              className="border border-white px-7 py-3 rounded-full hover:bg-white hover:text-[#2E7D32] transition"
            >
              Browse Products
            </Link>
          </div>
        </motion.div>

        {/* second section  */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-8">
          <Link to="/addProduct" className="block">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 12px 25px rgba(0,0,0,0.12)",
              }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm
               aspect-square
               flex flex-col items-center justify-center
               p-3 text-center transition-all duration-300"
            >
              <FaPlusCircle className="text-4xl text-[#2E7D32] mb-3" />

              <h2 className="font-bold text-base">
                Add Product
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                Upload Product
              </p>
            </motion.div>
          </Link>

          <Link to="/myProducts" className="block">
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 12px 25px rgba(0,0,0,0.12)",
              }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm aspect-square flex flex-col items-center justify-center p-3 text-center transition-all duration-300"
            >
              <FaBoxOpen className="text-4xl text-[#F4A261] mb-3" />

              <h2 className="font-bold text-base">
                My Products
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                Manage Products
              </p>
            </motion.div>
          </Link>
          <Link to="/swapRequest" className="block">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 12px 25px rgba(0,0,0,0.12)",
              }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm aspect-square flex flex-col items-center justify-center p-3 text-center transition-all duration-300"
            >
              <FaExchangeAlt className="text-4xl text-[#2E7D32] mb-3" />

              <h2 className="font-bold text-base">
                Swap Requests
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                View Requests
              </p>
            </motion.div>
          </Link>

          <Link to="/profile" className="block">
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 12px 25px rgba(0,0,0,0.12)",
              }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm aspect-square flex flex-col items-center justify-center p-3 text-center transition-all duration-300"
            >
              <FaUserCircle className="text-4xl text-[#F4A261] mb-3" />

              <h2 className="font-bold text-base">
                Profile
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                Edit Profile
              </p>
            </motion.div>
          </Link>
        </div>

        {/* third section  */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-8">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 12px 25px rgba(0,0,0,0.12)",
            }}
            className="bg-white border border-gray-100 rounded-l-xl aspect-square flex flex-col items-center justify-center p-3 shadow-sm transition-all duration-300"
          >
            <FaBoxOpen className="text-4xl text-[#2E7D32] mb-3" />

            <h3 className="text-3xl font-bold text-[#2E7D32]">
              0
            </h3>

            <p className="text-sm text-gray-500 mt-1 text-center">
              Products Listed
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 12px 25px rgba(0,0,0,0.12)",
            }}
            className="bg-white border border-gray-100 rounded-r-xl aspect-square flex flex-col items-center justify-center p-3 shadow-sm transition-all duration-300"
          >
            <FaExchangeAlt className="text-4xl text-[#F4A261] mb-3" />

            <h3 className="text-3xl font-bold text-[#F4A261]">
              0
            </h3>

            <p className="text-sm text-gray-500 mt-1 text-center">
              Swap Requests
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 12px 25px rgba(0,0,0,0.12)",
            }}
            className="bg-white border border-gray-100 rounded-l-xl aspect-square flex flex-col items-center justify-center p-3 shadow-sm transition-all duration-300"
          >
            <FaCheckCircle className="text-4xl text-green-500 mb-3" />

            <h3 className="text-3xl font-bold text-green-600">
              0
            </h3>

            <p className="text-sm text-gray-500 mt-1 text-center">
              Accepted Swaps
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 12px 25px rgba(0,0,0,0.12)",
            }}
            className="bg-white border border-gray-100 rounded-r-xl aspect-square flex flex-col items-center justify-center p-3 shadow-sm transition-all duration-300"
          >
            <FaTimesCircle className="text-4xl text-red-500 mb-3" />

            <h3 className="text-3xl font-bold text-red-500">
              0
            </h3>

            <p className="text-sm text-gray-500 mt-1 text-center">
              Rejected Swaps
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Welcome;