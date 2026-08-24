import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaSearch, FaArrowLeft, FaExchangeAlt, FaTrash, FaBoxOpen } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Mobiles",
    "Electronics",
    "Gaming",
    "Books",
    "Fashion",
    "Home Items",
    "Others",
  ];

  const fetchWishlist = async () => {
    try {
      const response = await axios.get("/getWishlist");
      setWishlist(response.data || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Failed to load wishlist items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    try {
      const response = await axios.post(`/toggleWishlist/${productId}`);
      setWishlist((prev) => prev.filter((item) => item._id !== productId));
      toast.success(response.data.message || "Removed from Wishlist");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item from wishlist");
    }
  };

  const filteredWishlist = wishlist.filter((item) => {
    const matchesSearch =
      item.productName?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase()) ||
      item.location?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      item.category?.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50/60 via-slate-50 to-amber-50/50">
        <div className="w-12 h-12 border-4 border-[#2E7D32] border-t-transparent rounded-full animate-spin shadow-md mb-3"></div>
        <p className="text-gray-600 font-bold text-sm tracking-wide">
          Loading Saved Wishlist...
        </p>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen py-8 sm:py-14 px-4 overflow-hidden bg-gradient-to-br from-emerald-50/60 via-slate-50 to-amber-50/50">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-red-400/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#2E7D32]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="relative max-w-6xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-[#2E7D32] hover:text-[#1E5621] font-bold text-xs sm:text-sm bg-white/90 hover:bg-white px-4 py-2 rounded-full border border-gray-200/80 transition shadow-xs mb-3 cursor-pointer"
            >
              <FaArrowLeft className="text-xs" />
              <span>Back to Marketplace</span>
            </Link>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
              <span>My Wishlist</span>
              <span className="inline-flex items-center gap-1 bg-red-50 text-red-500 border border-red-200/60 text-xs sm:text-sm font-bold px-3 py-1 rounded-full shadow-2xs">
                <FaHeart className="text-red-500 text-xs sm:text-sm animate-bounce" /> {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"}
              </span>
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm font-medium mt-1">
              Your saved items ready for instant exchange requests
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#2E7D32] to-[#1E5621] hover:from-[#256728] hover:to-[#164219] text-white font-bold px-5 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 text-xs sm:text-sm self-start sm:self-auto cursor-pointer"
          >
            <FaBoxOpen className="text-base" />
            <span>Browse More Products</span>
          </Link>
        </div>

        {/* Filter Controls Bar */}
        {wishlist.length > 0 && (
          <div className="bg-white/90 backdrop-blur-xl p-4 sm:p-5 rounded-3xl shadow-xl shadow-emerald-950/5 border border-white/80 space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              
              {/* Search input */}
              <div className="relative flex-1 w-full flex items-center bg-gray-50/80 border border-gray-200 rounded-2xl px-4 py-3 focus-within:bg-white focus-within:border-[#2E7D32] focus-within:ring-4 focus-within:ring-[#2E7D32]/10 transition-all">
                <FaSearch className="text-gray-400 text-sm mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Search wishlist items by name, city or details..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent outline-none text-xs sm:text-sm text-gray-800 font-medium placeholder-gray-400"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="text-xs font-bold text-gray-400 hover:text-gray-600 transition"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 shrink-0 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      selectedCategory.toLowerCase() === cat.toLowerCase()
                        ? "bg-[#2E7D32] text-white shadow-md shadow-[#2E7D32]/20"
                        : "bg-gray-100/80 text-gray-600 hover:bg-gray-200/80 hover:text-gray-900"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* Wishlist Grid or Empty State */}
        {filteredWishlist.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-14 text-center flex flex-col items-center justify-center max-w-lg mx-auto">
            <div className="w-20 h-20 rounded-full bg-red-50 border border-red-100 text-red-500 flex items-center justify-center text-3xl shadow-sm mb-4">
              <FaHeart />
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-800">
              {wishlist.length === 0 ? "Your Wishlist is Empty" : "No Items Match Your Filter"}
            </h3>

            <p className="text-gray-500 text-xs sm:text-sm font-medium mt-2 max-w-xs leading-relaxed">
              {wishlist.length === 0
                ? "Tap the heart ❤️ icon on any product while browsing to save it here for quick access!"
                : "Try changing your search term or selecting 'All' categories."}
            </p>

            {wishlist.length === 0 ? (
              <Link
                to="/products"
                className="mt-6 bg-[#2E7D32] hover:bg-[#236327] text-white font-bold px-6 py-3 rounded-full text-xs sm:text-sm shadow-md shadow-[#2E7D32]/20 hover:scale-105 transition-transform"
              >
                Explore Marketplace
              </Link>
            ) : (
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="mt-6 text-[#2E7D32] font-bold text-xs hover:underline cursor-pointer"
              >
                Reset Search Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredWishlist.map((product, index) => {
                const orangeCategories = ["mobiles", "gaming", "home items"];
                const isOrange = orangeCategories.includes(product.category?.toLowerCase());
                const borderColor = isOrange ? "border-t-[#F4A261]" : "border-t-[#2E7D32]";

                return (
                  <motion.div
                    key={product._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
                    className={`group relative bg-white rounded-3xl overflow-hidden border border-gray-100 border-t-4 ${borderColor} shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full`}
                  >
                    <div>
                      {/* Product Image */}
                      <div className="relative h-48 sm:h-52 overflow-hidden bg-gray-50">
                        <img
                          src={product.image}
                          alt={product.productName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Category Badge */}
                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#2E7D32] border border-[#2E7D32]/20 px-3 py-1 rounded-full text-xs font-bold shadow-xs">
                          {product.category}
                        </span>

                        {/* Remove Heart Button */}
                        <button
                          onClick={(e) => handleRemoveFromWishlist(product._id, e)}
                          className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 backdrop-blur-md text-red-500 hover:bg-red-500 hover:text-white shadow-md transition-all duration-200 cursor-pointer group/btn"
                          title="Remove from Wishlist"
                        >
                          <FaHeart className="text-sm scale-110 group-hover/btn:scale-125 transition-transform" />
                        </button>
                      </div>

                      {/* Info Content */}
                      <div className="p-5 flex flex-col justify-between flex-grow">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 truncate">
                              <FaLocationDot className="text-[#F4A261] shrink-0" />
                              <span className="truncate">{product.location}</span>
                            </span>
                          </div>

                          <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#2E7D32] transition-colors line-clamp-1">
                            {product.productName}
                          </h3>

                          <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <p className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-gray-400 flex items-center gap-1">
                            <FaExchangeAlt className="text-[#2E7D32]" /> Exchange For
                          </p>
                          <p className="font-semibold text-xs sm:text-sm text-[#F4A261] mt-0.5 truncate">
                            {product.exchangeFor}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="p-5 pt-0 flex gap-2">
                      <Link
                        to={`/product/${product._id}`}
                        className="flex-1 bg-[#2E7D32] hover:bg-[#236327] text-white font-bold py-2.5 rounded-2xl shadow-md text-xs sm:text-sm text-center block transition-all hover:scale-[1.02]"
                      >
                        View Details &rarr;
                      </Link>

                      <button
                        onClick={(e) => handleRemoveFromWishlist(product._id, e)}
                        className="px-3 py-2.5 rounded-2xl bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 border border-red-100 transition-colors cursor-pointer text-xs font-bold flex items-center justify-center"
                        title="Remove Item"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
};

export default Wishlist;
