import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../utils/axiosInstance.js";
import ProductCard from "./ProductCard";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";

const CATEGORIES = [
  "All",
  "Books",
  "Mobiles",
  "Electronics",
  "Gaming",
  "Accessories",
  "Home Items",
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  const activeCategory = searchParams.get("category") || "All";

  const getProducts = async () => {
    try {
      const response = await axios.get("/getProduct");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleCategorySelect = (cat) => {
    if (cat === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  // Filter products by Category & Search
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" ||
      product.category?.toLowerCase() === activeCategory.toLowerCase();

    const matchesSearch =
      product.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.location?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full min-h-screen bg-gray-50/60 py-8 sm:py-12 px-4">
      <section className="w-[92%] max-w-6xl mx-auto space-y-8 sm:space-y-10">
        
        {/* Top Banner Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden bg-gradient-to-r from-[#2E7D32] via-[#256728] to-[#1E5621] rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-[#2E7D32]/15 border border-emerald-600/30 text-center"
        >
          {/* Ambient Light Orb */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/15 text-emerald-100 border border-white/20 mb-3 shadow-xs">
              Discover & Exchange
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Explore Marketplace
            </h1>
            <p className="mt-2 sm:mt-3 text-sm sm:text-lg text-emerald-100/90 font-medium leading-relaxed">
              Browse items listed by users nearby. Filter by category or search to find your perfect swap deal.
            </p>
          </div>
        </motion.div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col items-center gap-5 sm:gap-6">
          
          {/* Search Bar */}
          <div className="relative w-full max-w-lg">
            <FaSearch className="absolute left-4.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search products by title, location, description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-full border border-gray-200/90 bg-white/90 text-sm font-semibold text-gray-800 focus:outline-none focus:bg-white focus:border-[#2E7D32] focus:ring-4 focus:ring-[#2E7D32]/10 transition-all shadow-sm"
            />
          </div>

          {/* Category Filter Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {CATEGORIES.map((cat) => {
              const isSelected =
                (cat === "All" && !searchParams.get("category")) ||
                searchParams.get("category") === cat;

              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 border cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-[#2E7D32] to-[#1E5621] border-[#2E7D32] text-white shadow-md shadow-[#2E7D32]/25 scale-105"
                      : "bg-white border-gray-200 text-gray-700 hover:border-[#2E7D32]/40 hover:text-[#2E7D32] shadow-2xs"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/80 backdrop-blur-md rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 border-4 border-[#2E7D32] border-t-transparent rounded-full animate-spin shadow-md mb-4" />
            <p className="text-gray-600 font-bold text-sm">
              Loading Products...
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-14 sm:py-16 bg-white rounded-3xl border border-gray-100 p-8 text-center max-w-md mx-auto shadow-md"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#2E7D32] flex items-center justify-center text-3xl mb-4 border border-emerald-100 shadow-xs">
              📦
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              No Products Found
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1.5 leading-relaxed font-medium">
              No items match your search or filter criteria. Try changing your filters or search term.
            </p>

            <button
              onClick={() => {
                setSearchParams({});
                setSearchTerm("");
              }}
              className="mt-5 bg-gradient-to-r from-[#2E7D32] to-[#1E5621] hover:from-[#256728] hover:to-[#164219] text-white text-xs font-bold px-6 py-3 rounded-full shadow-md shadow-[#2E7D32]/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          /* Products Grid: 2 columns on Mobile (grid-cols-2) | 3 columns on Desktop (md:grid-cols-3) */
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Products;