import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBoxOpen, FaExchangeAlt, FaPlusCircle, FaUserCircle, FaCheckCircle, FaTimesCircle, } from "react-icons/fa";

const Welcome = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <section className="min-h-[85vh] bg-gray-50 py-10 px-4">
      <div className="w-[90%] max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-[#2E7D32] to-[#43A047] rounded-3xl p-8 md:p-10 text-white shadow-lg"
        >
          <h1 className="text-3xl md:text-5xl font-bold">
            Welcome Back, {user?.name}
          </h1>

          <p className="mt-4 text-lg text-green-100 max-w-2xl">
            Manage your products, swap requests and profile from one
            beautiful dashboard.
          </p>

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
        {/* <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10"> */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10">

          <Link to="/addProduct" className="h-full">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 20px 35px rgba(0,0,0,0.12)"
              }}
              className="bg-white rounded-3xl shadow-md p-5 md:p-6 cursor-pointer h-full flex flex-col transition-all duration-300"
            >
              <FaPlusCircle className="text-5xl text-[#2E7D32] mb-5" />
              <h2 className="text-xl font-bold">Add Product</h2>
              <p className="text-gray-600 mt-2 flex-1">
                Upload a product you want to exchange.
              </p>
            </motion.div>
          </Link>

          <Link to='/myProducts' className="h-full">
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 20px 35px rgba(0,0,0,0.12)"
              }}
              className="bg-white rounded-3xl shadow-md p-5 md:p-6 cursor-pointer h-full flex flex-col transition-all duration-300"
            >
              <FaBoxOpen className="text-5xl text-[#F4A261] mb-5" />
              <h2 className="text-xl font-bold">My Products</h2>
              <p className="text-gray-600 mt-2 flex-1">
                View and manage your listed products.
              </p>
            </motion.div>
          </Link>

          <Link to="/swapRequest" className="h-full">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 20px 35px rgba(0,0,0,0.12)",
              }}
              className="bg-white rounded-3xl shadow-md p-5 md:p-6 cursor-pointer h-full flex flex-col transition-all duration-300"
            >
              <FaExchangeAlt className="text-5xl text-[#2E7D32] mb-5" />

              <h2 className="text-xl font-bold">
                Swap Requests
              </h2>

              <p className="text-gray-600 mt-2 flex-1">
                Check exchange requests from users.
              </p>
            </motion.div>
          </Link>

          <Link to="/profile" className="h-full">
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 20px 35px rgba(0,0,0,0.12)",
              }}
              className="bg-white rounded-3xl shadow-md p-5 md:p-6 cursor-pointer h-full flex flex-col transition-all duration-300"
            >
              <FaUserCircle className="text-5xl text-[#F4A261] mb-5" />

              <h2 className="text-xl font-bold">
                Profile
              </h2>

              <p className="text-gray-600 mt-2 flex-1">
                Update your account information.
              </p>
            </motion.div>
          </Link>

        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-md p-6 text-center hover:shadow-xl transition-all duration-300"
        >

          <div className="bg-white rounded-3xl shadow-md p-6 text-center hover:shadow-xl transition">
            <FaBoxOpen className="text-5xl text-[#2E7D32] mx-auto mb-4" />

            <h3 className="text-4xl font-bold text-[#2E7D32]">
              0
            </h3>

            <p className="mt-2 text-gray-600">
              Products Listed
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-md p-6 text-center hover:shadow-xl transition-all duration-300"
          >
            <FaExchangeAlt className="text-5xl text-[#F4A261] mx-auto mb-4" />

            <h3 className="text-4xl font-bold text-[#F4A261]">
              0
            </h3>

            <p className="mt-2 text-gray-600">
              Swap Requests
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl shadow-md p-6 text-center hover:shadow-xl transition-all duration-300"
          >
            <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />

            <h3 className="text-4xl font-bold text-green-600">
              0
            </h3>

            <p className="mt-2 text-gray-600">
              Accepted Swaps
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl shadow-md p-6 text-center hover:shadow-xl transition-all duration-300"
          >
            <FaTimesCircle className="text-5xl text-red-500 mx-auto mb-4" />

            <h3 className="text-4xl font-bold text-red-500">
              0
            </h3>

            <p className="mt-2 text-gray-600">
              Rejected Swaps
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Welcome;