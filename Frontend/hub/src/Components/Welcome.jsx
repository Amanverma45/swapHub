import { Link } from "react-router-dom";
import {FaBoxOpen,FaExchangeAlt,FaPlusCircle,FaUserCircle,} from "react-icons/fa";

const Welcome = () => {
  return (
    <section className="min-h-[85vh] bg-gray-50 py-10 px-4">
      <div className="w-[90%] max-w-6xl mx-auto">

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-[#2E7D32] to-[#43A047] rounded-3xl p-8 md:p-10 text-white shadow-lg">

          <h1 className="text-3xl md:text-5xl font-bold">
            Welcome to SwapHub 👋
          </h1>

          <p className="mt-4 text-lg text-green-100 max-w-2xl">
            You have successfully logged in. Manage your products,
            explore exchanges and connect with other users.
          </p>

          <Link
            to="/products"
            className="inline-block mt-8 bg-white text-[#2E7D32] font-semibold px-7 py-3 rounded-full hover:bg-gray-100 transition"
          >
            Explore Products
          </Link>

        </div>

        {/* Dashboard Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          <Link to="/addProduct">
            <div className="bg-white rounded-3xl shadow-md p-6 hover:-translate-y-2 transition">
              <FaPlusCircle className="text-5xl text-[#2E7D32] mb-5" />
              <h2 className="text-xl font-bold">Add Product</h2>
              <p className="text-gray-600 mt-2">
                Upload a product you want to exchange.
              </p>
            </div>
          </Link>

          <Link to='/myProducts'>
            <div className="bg-white rounded-3xl shadow-md p-6 hover:-translate-y-2 transition">
              <FaBoxOpen className="text-5xl text-[#F4A261] mb-5" />
              <h2 className="text-xl font-bold">My Products</h2>
              <p className="text-gray-600 mt-2">
                View and manage your listed products.
              </p>
            </div>
          </Link>

          <Link to='/swapRequest'>
            <div className="bg-white rounded-3xl shadow-md p-6 hover:-translate-y-2 transition">
              <FaExchangeAlt className="text-5xl text-[#2E7D32] mb-5" />
              <h2 className="text-xl font-bold">Swap Requests</h2>
              <p className="text-gray-600 mt-2">
                Check exchange requests from users.
              </p>
            </div>
          </Link>

          <Link to='/profile'>
            <div className="bg-white rounded-3xl shadow-md p-6 hover:-translate-y-2 transition">
              <FaUserCircle className="text-5xl text-[#F4A261] mb-5" />
              <h2 className="text-xl font-bold">Profile</h2>
              <p className="text-gray-600 mt-2">
                Update your account information.
              </p>
            </div>
          </Link>

        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white rounded-3xl shadow-sm p-6 text-center">
            <h3 className="text-4xl font-bold text-[#2E7D32]">0</h3>
            <p className="text-gray-600 mt-2">Products Listed</p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-6 text-center">
            <h3 className="text-4xl font-bold text-[#F4A261]">0</h3>
            <p className="text-gray-600 mt-2">Swap Requests</p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-6 text-center">
            <h3 className="text-4xl font-bold text-[#2E7D32]">0</h3>
            <p className="text-gray-600 mt-2">Completed Swaps</p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Welcome;