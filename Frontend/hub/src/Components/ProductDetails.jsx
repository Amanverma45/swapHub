import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../utils/axiosInstance.js";
import toast from "react-hot-toast";
import { FaExchangeAlt } from "react-icons/fa";
import { FaLocationDot, FaCalendarDays } from "react-icons/fa6";

const ProductDetails = () => {
  const [myProducts, setMyProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");

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
        <div className="w-10 h-10 border-4 border-[#2E7D32] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-sm font-semibold text-gray-600">
          Loading Product Details...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-3xl mb-4">
          ⚠️
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
        <p className="text-gray-500 text-sm mt-2">
          The requested product may have been removed or is unavailable.
        </p>
        <Link
          to="/products"
          className="mt-6 bg-[#2E7D32] text-white font-bold px-6 py-2.5 rounded-full hover:bg-[#236327] transition"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50/50 py-8 md:py-14">
      <section className="w-[92%] max-w-6xl mx-auto">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2E7D32] hover:underline"
          >
            &larr; Back to Products
          </Link>
        </div>

        {/* Product Card Details Shell */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 border-t-4 border-t-[#2E7D32] overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 sm:p-8 md:p-10 items-center">
            
            {/* Left Image View */}
            <div className="h-[280px] sm:h-[360px] md:h-[420px] bg-gray-50/80 rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex items-center justify-center">
              <img
                src={product.image}
                alt={product.productName}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Right Product Details Info */}
            <div className="flex flex-col justify-between h-full">
              <div>
                <span className="inline-block bg-[#2E7D32]/10 border border-[#2E7D32]/20 text-[#2E7D32] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                  {product.category}
                </span>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                  {product.productName}
                </h1>

                <div className="mt-6 space-y-3 sm:space-y-4 border-y border-gray-100 py-5">
                  <div className="flex items-center text-xs sm:text-sm">
                    <span className="w-36 font-bold text-gray-500 flex items-center gap-1.5">
                      <FaExchangeAlt className="text-[#2E7D32]" /> Exchange For:
                    </span>
                    <span className="text-[#F4A261] font-bold text-sm sm:text-base">
                      {product.exchangeFor}
                    </span>
                  </div>

                  <div className="flex items-center text-xs sm:text-sm">
                    <span className="w-36 font-bold text-gray-500 flex items-center gap-1.5">
                      <FaLocationDot className="text-[#F4A261]" /> Location:
                    </span>
                    <span className="text-gray-800 font-semibold">
                      {product.location}
                    </span>
                  </div>

                  <div className="flex items-center text-xs sm:text-sm">
                    <span className="w-36 font-bold text-gray-500 flex items-center gap-1.5">
                      <FaCalendarDays className="text-[#2E7D32]" /> Posted On:
                    </span>
                    <span className="text-gray-700 font-medium">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <h3 className="font-bold text-sm text-gray-900 mb-2">
                    Product Description
                  </h3>
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {product.description}
                  </div>
                </div>
              </div>

              {/* Swap Request Action Area */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                {!token ? (
                  /* Logged Out Visitors prompt */
                  <div className="bg-[#2E7D32]/10 border border-[#2E7D32]/25 rounded-2xl p-5 text-center">
                    <h3 className="font-bold text-[#2E7D32] text-sm sm:text-base">
                      Want to Exchange for this item?
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">
                      Login or register your SwapHub account to send an exchange request.
                    </p>
                    <div className="flex items-center justify-center gap-3 mt-4">
                      <Link
                        to="/login"
                        className="bg-white border-2 border-[#2E7D32] text-[#2E7D32] font-bold px-5 py-2 rounded-xl text-xs sm:text-sm hover:bg-[#2E7D32] hover:text-white transition-all shadow-xs"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="bg-[#2E7D32] border-2 border-[#2E7D32] text-white font-bold px-5 py-2 rounded-xl text-xs sm:text-sm hover:bg-[#236327] transition-all shadow-md shadow-[#2E7D32]/20"
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
                          No Products Added Yet
                        </h3>
                        <p className="text-xs text-amber-700 mt-1">
                          You need to list at least one product before requesting a swap.
                        </p>
                        <Link
                          to="/addProduct"
                          className="inline-block mt-3 bg-[#2E7D32] text-white text-xs font-bold px-5 py-2 rounded-full hover:bg-[#236327] transition-colors shadow-xs"
                        >
                          + Add Product
                        </Link>
                      </div>
                    ) : (
                      <div>
                        <label className="block font-bold text-xs sm:text-sm text-gray-800 mb-2">
                          Select Your Product to Exchange:
                        </label>
                        <select
                          value={selectedProduct}
                          onChange={(e) => setSelectedProduct(e.target.value)}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 transition-all"
                        >
                          <option value="">-- Choose From Your Products --</option>
                          {myProducts.map((item) => (
                            <option key={item._id} value={item._id}>
                              {item.productName}
                            </option>
                          ))}
                        </select>

                        <button
                          onClick={sendSwapRequest}
                          className="mt-4 w-full bg-[#2E7D32] border-2 border-[#2E7D32] hover:bg-[#236327] hover:border-[#236327] text-white font-bold py-3 rounded-xl shadow-md shadow-[#2E7D32]/20 hover:scale-105 active:scale-95 transition-all duration-200 text-xs sm:text-sm"
                        >
                          Send Swap Request &rarr;
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </section>
    </div>
  );
};

export default ProductDetails;