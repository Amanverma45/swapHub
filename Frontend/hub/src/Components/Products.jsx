import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../utils/axiosInstance.js";
import ProductCard from "./ProductCard";
import ReportModal from "./ReportModal";
import toast from "react-hot-toast";
import { FaSearch, FaTimes } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

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
  const [locationSearch, setLocationSearch] = useState(searchParams.get("location") || "");
  const [wishlistIds, setWishlistIds] = useState([]);
  const [reportedProductIds, setReportedProductIds] = useState([]);
  const [reportProductModalItem, setReportProductModalItem] = useState(null);

  const token = localStorage.getItem("token");
  const activeCategory = searchParams.get("category") || "All";

  // Helper to format city names cleanly (e.g. "indore" -> "Indore")
  const formatCityName = (str) => {
    if (!str) return "";
    return str
      .trim()
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Extract unique locations case-insensitively from products list
  const availableLocations = Array.from(
    products
      .reduce((map, p) => {
        if (p.location && p.location.trim()) {
          const formatted = formatCityName(p.location);
          const key = formatted.toLowerCase();
          if (!map.has(key)) {
            map.set(key, formatted);
          }
        }
        return map;
      }, new Map())
      .values()
  );

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

  const getWishlistIds = async () => {
    if (!token) return;
    try {
      const response = await axios.get("/getWishlistIds");
      setWishlistIds(response.data || []);
    } catch (error) {
      console.log("Error fetching wishlist IDs:", error);
    }
  };

  const getReportedProductIds = async () => {
    if (!token) return;
    try {
      const response = await axios.get("/getUserReportedProductIds");
      setReportedProductIds(response.data || []);
    } catch (error) {
      console.log("Error fetching reported product IDs:", error);
    }
  };

  useEffect(() => {
    getProducts();
    if (token) {
      getWishlistIds();
      getReportedProductIds();
    }
  }, [token]);

  const handleToggleWishlist = async (productId) => {
    if (!token) {
      toast.error("Please login to save items to your wishlist!");
      return;
    }
    try {
      const response = await axios.post(`/toggleWishlist/${productId}`);
      if (response.data.isWishlisted) {
        setWishlistIds((prev) => [...prev, productId]);
        toast.success("Saved to Wishlist ❤️");
      } else {
        setWishlistIds((prev) => prev.filter((id) => id !== productId));
        toast.success("Removed from Wishlist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update wishlist");
    }
  };

  const handleCategorySelect = (cat) => {
    const currentParams = {};
    if (cat !== "All") currentParams.category = cat;
    if (locationSearch) currentParams.location = locationSearch;
    setSearchParams(currentParams);
  };

  const handleLocationSelect = (loc) => {
    setLocationSearch(loc);
    const currentParams = {};
    if (activeCategory !== "All") currentParams.category = activeCategory;
    if (loc) currentParams.location = loc;
    setSearchParams(currentParams);
  };

  // Filter products by Category, Product Search & Location Search
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" ||
      product.category?.toLowerCase() === activeCategory.toLowerCase();

    const matchesSearch =
      !searchTerm ||
      product.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      !locationSearch ||
      product.location?.toLowerCase().includes(locationSearch.toLowerCase());

    return matchesCategory && matchesSearch && matchesLocation;
  });

  return (
    <div className="w-full min-h-screen bg-gray-50/60 py-8 sm:py-12 px-4">
      <section className="w-[92%] max-w-6xl mx-auto space-y-8 sm:space-y-10">
        
        {/* Top Banner Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
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
              Browse items listed by users nearby. Filter by city location or category to find your perfect swap deal.
            </p>
          </div>
        </motion.div>

        {/* Dual Search & Location Filter Controls */}
        <div className="flex flex-col items-center gap-5 sm:gap-6">
          
          <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Product Search Input */}
            <div className="relative sm:col-span-7">
              <FaSearch className="absolute left-4.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search product title, description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-9 py-3.5 rounded-2xl sm:rounded-full border border-gray-200/90 bg-white text-sm font-semibold text-gray-800 focus:outline-none focus:bg-white focus:border-[#2E7D32] focus:ring-4 focus:ring-[#2E7D32]/10 transition-all shadow-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Location Search Input */}
            <div className="relative sm:col-span-5">
              <FaLocationDot className="absolute left-4.5 top-1/2 -translate-y-1/2 text-[#F4A261] text-base" />
              <input
                type="text"
                placeholder="Filter location (e.g. Indore)..."
                value={locationSearch}
                onChange={(e) => handleLocationSelect(e.target.value)}
                className="w-full pl-12 pr-9 py-3.5 rounded-2xl sm:rounded-full border border-gray-200/90 bg-white text-sm font-semibold text-gray-800 focus:outline-none focus:bg-white focus:border-[#F4A261] focus:ring-4 focus:ring-[#F4A261]/10 transition-all shadow-sm"
              />
              {locationSearch && (
                <button
                  onClick={() => handleLocationSelect("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>

          {/* Quick Location Chips (if available) */}
          {availableLocations.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              <span className="text-xs font-bold text-gray-500 mr-1 flex items-center gap-1">
                <FaLocationDot className="text-[#F4A261]" /> Popular Cities:
              </span>
              <button
                onClick={() => handleLocationSelect("")}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                  !locationSearch
                    ? "bg-[#F4A261] border-[#F4A261] text-white shadow-xs"
                    : "bg-white border-gray-200 text-gray-600 hover:border-[#F4A261]/50 hover:text-[#F4A261]"
                }`}
              >
                All Cities
              </button>

              {availableLocations.map((loc) => {
                const isSelected =
                  locationSearch.toLowerCase() === loc.toLowerCase();
                return (
                  <button
                    key={loc}
                    onClick={() => handleLocationSelect(loc)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                      isSelected
                        ? "bg-[#F4A261] border-[#F4A261] text-white shadow-xs scale-105"
                        : "bg-white border-gray-200 text-gray-600 hover:border-[#F4A261]/50 hover:text-[#F4A261]"
                    }`}
                  >
                    📍 {loc}
                  </button>
                );
              })}
            </div>
          )}

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

        {/* Active Location Filter Alert Banner */}
        {locationSearch && (
          <div className="bg-amber-50/90 border border-amber-200/90 rounded-2xl p-3.5 sm:p-4 flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-amber-900 shadow-sm max-w-3xl mx-auto">
            <div className="flex items-center gap-2">
              <FaLocationDot className="text-[#F4A261] text-base shrink-0" />
              <span>
                Showing products in <span className="text-[#F4A261] font-extrabold underline">{locationSearch}</span> ({filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"} found)
              </span>
            </div>
            <button
              onClick={() => handleLocationSelect("")}
              className="text-xs bg-white text-amber-900 hover:bg-amber-100 border border-amber-300 px-3 py-1 rounded-full font-bold transition cursor-pointer shrink-0"
            >
              Clear Location Filter ✕
            </button>
          </div>
        )}

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
                setLocationSearch("");
              }}
              className="mt-5 bg-gradient-to-r from-[#2E7D32] to-[#1E5621] hover:from-[#256728] hover:to-[#164219] text-white text-xs font-bold px-6 py-3 rounded-full shadow-md shadow-[#2E7D32]/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          /* Products Grid: 2 columns on Mobile (grid-cols-2) | 3 columns on Desktop (md:grid-cols-3) */
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-6 md:gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product._id}
                product={product}
                index={index}
                isWishlisted={wishlistIds.includes(product._id)}
                onToggleWishlist={token ? handleToggleWishlist : undefined}
                isReported={reportedProductIds.includes(product._id)}
                onOpenReportModal={(prod) => setReportProductModalItem(prod)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Report Product Modal */}
      <ReportModal
        product={reportProductModalItem}
        isOpen={!!reportProductModalItem}
        onClose={() => setReportProductModalItem(null)}
        onReportSuccess={(prodId) =>
          setReportedProductIds((prev) => [...prev, prodId])
        }
      />
    </div>
  );
};

export default Products;