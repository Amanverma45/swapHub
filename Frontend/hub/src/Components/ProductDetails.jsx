import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../utils/axiosInstance.js";
import toast from "react-hot-toast";
import { FaExchangeAlt, FaArrowLeft, FaRegClock, FaPaperPlane } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const ProductDetails = () => {
  const [myProducts, setMyProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const loggedInUser = token ? JSON.parse(localStorage.getItem("user") || "{}") : null;
  const isOwner = loggedInUser && product?.owner === loggedInUser?._id;

  const getMyProducts = async () => {
    if (!token) return;
    try {
      const response = await axios.get("/myProducts");
      setMyProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getSingleProduct = async () => {
    try {
      const response = await axios.get(`/getProduct/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const sendSwapRequest = async () => {
    if (!selectedProduct) {
      toast.error("Please select your product to exchange");
      return;
    }

    try {
      const response = await axios.post("/swapProduct", {
        receiver: product.owner,
        requestedProduct: product._id,
        offeredProduct: selectedProduct,
      });

      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getSingleProduct();
    if (token) {
      getMyProducts();
    }
  }, [id, token]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-[#2E7D32] border-t-transparent rounded-full animate-spin shadow-md mb-4" />
        <p className="text-gray-600 font-bold text-sm">
          Loading Product Details...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center text-3xl mb-4 border border-red-100 shadow-xs">
          ⚠️
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Product Not Found</h2>
        <p className="text-gray-500 text-sm mt-2 max-w-sm">
          The requested product may have been removed or is unavailable.
        </p>
        <Link
          to="/products"
          className="mt-6 bg-gradient-to-r from-[#2E7D32] to-[#1E5621] text-white font-bold px-6 py-3 rounded-full shadow-md shadow-[#2E7D32]/20 hover:scale-105 active:scale-95 transition-all"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="w-full min-h-screen bg-gray-50/60 py-8 sm:py-12 px-4">
        <section className="w-[92%] max-w-6xl mx-auto space-y-6">
          
          {/* Back Button */}
          <div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-white text-[#2E7D32] border border-gray-200 shadow-xs hover:shadow-md px-4 py-2 rounded-full hover:bg-emerald-50 hover:-translate-x-1 transition-all cursor-pointer"
            >
              <FaArrowLeft className="text-xs" />
              <span>Back to Products</span>
            </Link>
          </div>

          {/* Product Showcase Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 border-t-4 border-t-[#2E7D32] overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-6 sm:gap-10 p-6 sm:p-8 md:p-10 items-stretch">
              
              {/* Left Image View */}
              <div className="h-[300px] sm:h-[380px] md:h-[450px] bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden shadow-inner relative group cursor-pointer"
                onClick={() => setPreviewImage(product.image)}
              >
                <img
                  src={product.image}
                  alt={product.productName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white font-bold text-xs sm:text-sm backdrop-blur-xs">
                  🔍 Click to expand image
                </div>
              </div>

              {/* Right Product Details Info */}
              <div className="flex flex-col justify-between h-full space-y-6">
                <div>
                  <span className="inline-block bg-[#2E7D32]/10 border border-[#2E7D32]/25 text-[#2E7D32] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
                    {product.category}
                  </span>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                    {product.productName}
                  </h1>

                  {/* Swap Preference Highlight Box */}
                  <div className="mt-5 bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 flex items-center gap-3 shadow-2xs">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#F4A261] flex items-center justify-center text-lg font-bold shrink-0 border border-amber-200">
                      <FaExchangeAlt />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                        Owner Wants In Exchange:
                      </span>
                      <p className="text-sm sm:text-base font-extrabold text-[#F4A261] leading-tight">
                        {product.exchangeFor}
                      </p>
                    </div>
                  </div>

                  {/* Location & Post Date */}
                  <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 font-semibold">
                      <FaLocationDot className="text-[#F4A261] text-base shrink-0" />
                      <span className="truncate">{product.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-semibold">
                      <FaRegClock className="text-[#2E7D32] text-base shrink-0" />
                      <span>{new Date(product.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-5">
                    <h3 className="font-bold text-xs sm:text-sm text-gray-900 mb-2">
                      Product Description
                    </h3>
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                      {product.description}
                    </div>
                  </div>
                </div>

                {/* Swap Request Action Area */}
                <div className="pt-4 border-t border-gray-100">
                  {!token ? (
                    /* Logged Out Visitors prompt */
                    <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-5 text-center shadow-xs">
                      <h3 className="font-bold text-[#2E7D32] text-sm sm:text-base">
                        Want to Swap for this item?
                      </h3>
                      <p className="text-xs text-gray-600 mt-1 font-medium">
                        Log in or register your SwapHub account to send an exchange request.
                      </p>
                      <div className="flex items-center justify-center gap-3 mt-4">
                        <Link
                          to="/login"
                          className="bg-white border border-[#2E7D32] text-[#2E7D32] font-bold px-5 py-2 rounded-xl text-xs sm:text-sm hover:bg-emerald-50 transition-all shadow-2xs"
                        >
                          Login
                        </Link>
                        <Link
                          to="/register"
                          className="bg-gradient-to-r from-[#2E7D32] to-[#1E5621] text-white font-bold px-5 py-2 rounded-xl text-xs sm:text-sm shadow-md shadow-[#2E7D32]/20 hover:scale-105 transition-all"
                        >
                          Register
                        </Link>
                      </div>
                    </div>
                  ) : isOwner ? (
                    /* Owner Notice */
                    <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 text-center">
                      <span className="text-xs sm:text-sm font-bold text-[#2E7D32]">
                        ✨ You are the owner of this product.
                      </span>
                    </div>
                  ) : (
                    /* Logged-In Swap Request Form */
                    <div>
                      {myProducts.length === 0 ? (
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 text-center">
                          <h3 className="font-bold text-amber-800 text-sm">
                            No Products Listed Yet
                          </h3>
                          <p className="text-xs text-amber-700 mt-1 font-medium">
                            You need to list at least one product in your inventory before requesting a swap.
                          </p>
                          <Link
                            to="/addProduct"
                            className="inline-block mt-3 bg-[#2E7D32] text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#236327] transition-colors shadow-2xs"
                          >
                            + Add Product
                          </Link>
                        </div>
                      ) : (
                        <div>
                          <label className="block font-bold text-xs sm:text-sm text-gray-800 mb-2">
                            Select Your Item to Offer in Exchange:
                          </label>
                          <select
                            value={selectedProduct}
                            onChange={(e) => setSelectedProduct(e.target.value)}
                            className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-xs sm:text-sm bg-white font-semibold text-gray-800 focus:outline-none focus:border-[#2E7D32] focus:ring-4 focus:ring-[#2E7D32]/10 transition-all shadow-2xs"
                          >
                            <option value="">-- Choose From Your Listed Products --</option>
                            {myProducts.map((item) => (
                              <option key={item._id} value={item._id}>
                                {item.productName} ({item.category})
                              </option>
                            ))}
                          </select>

                          <button
                            onClick={sendSwapRequest}
                            className="mt-4 w-full bg-gradient-to-r from-[#2E7D32] to-[#1E5621] hover:from-[#256728] hover:to-[#164219] text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-[#2E7D32]/25 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-200 text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <FaPaperPlane className="text-xs" />
                            <span>Send Swap Request</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </motion.div>

        </section>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <button
            onClick={() => setPreviewImage(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 text-white text-xl flex items-center justify-center hover:bg-white/40 transition font-bold"
          >
            ✕
          </button>

          <img
            src={previewImage}
            alt="Preview"
            className="max-w-[90%] max-h-[85vh] rounded-3xl shadow-2xl border border-white/20 object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default ProductDetails;