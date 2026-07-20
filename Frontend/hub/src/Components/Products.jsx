import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
    <div className="w-full min-h-screen bg-gray-50/50 py-8 md:py-14">
      <section className="w-[92%] max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <span className="bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/25 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            Discover & Exchange
          </span>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mt-3">
            Explore All <span className="text-[#2E7D32]">Products</span>
          </h1>

          <p className="text-gray-500 text-xs sm:text-base mt-2 max-w-lg mx-auto">
            Browse items listed by users nearby. Filter by category or search to find your perfect swap.
          </p>
        </div>

        {/* Search & Category Filter Control */}
        <div className="mb-8 md:mb-12 flex flex-col items-center gap-5">
          
          {/* Search Bar */}
          <div className="relative w-full max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search products by title, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 transition-all shadow-sm"
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
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 border ${
                    isSelected
                      ? "bg-[#2E7D32] border-[#2E7D32] text-white shadow-md shadow-[#2E7D32]/25 scale-105"
                      : "bg-white border-gray-200 text-gray-700 hover:border-[#2E7D32]/40 hover:text-[#2E7D32]"
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
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#2E7D32] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-sm font-semibold text-gray-600">
              Loading Products...
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-3xl border border-gray-100 p-8 text-center max-w-md mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center text-3xl mb-4">
              📦
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              No Products Found
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1.5 leading-relaxed">
              No items match your search or filter criteria. Try changing your filters or search term.
            </p>

            <button
              onClick={() => {
                setSearchParams({});
                setSearchTerm("");
              }}
              className="mt-5 bg-[#2E7D32] text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#236327] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Products Grid: 2 columns on Mobile (grid-cols-2) | 3 columns on Desktop (md:grid-cols-3) */
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
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