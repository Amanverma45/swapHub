import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLocationDot } from "react-icons/fa6";
import { FaExchangeAlt, FaHeart, FaEllipsisV, FaFlag } from "react-icons/fa";

const ProductCard = ({
  product,
  index,
  isWishlisted = false,
  onToggleWishlist,
  isReported = false,
  onOpenReportModal,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const orangeCategories = ["mobiles", "gaming", "home items"];
  const isOrange = orangeCategories.includes(product.category?.toLowerCase());
  const borderColor = isOrange ? "border-t-[#F4A261]" : "border-t-[#2E7D32]";
  const hoverShadow = isOrange 
    ? "0px 20px 40px rgba(244,162,97,0.18)" 
    : "0px 20px 40px rgba(46,125,50,0.15)";
  
  // Staggered delay based on grid column position
  const delay = Math.min((index % 3) * 0.06, 0.18);

  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(product._id);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showMenu]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={{
        y: -10,
        boxShadow: hoverShadow,
      }}
      className={`group relative bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-gray-100 border-t-4 ${borderColor} shadow-md transition-colors duration-300 flex flex-col justify-between h-full`}
    >
      <div>
        {/* Product Image with Hover Zoom */}
        <div className="relative h-36 sm:h-44 md:h-48 overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.productName}
            className="w-full h-full object-cover transition-transform duration-500 scale-125 hover:scale-100"
            loading="lazy"
          />
          <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md text-[#2E7D32] border border-[#2E7D32]/20 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold shadow-xs z-10">
            {product.category}
          </span>

          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-20">
            {/* Wishlist Heart Toggle Button */}
            {onToggleWishlist && (
              <button
                onClick={handleHeartClick}
                className={`p-2 sm:p-2.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-md cursor-pointer ${
                  isWishlisted
                    ? "bg-red-500 text-white scale-110 shadow-red-500/30"
                    : "bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white hover:scale-110"
                }`}
                title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
              >
                <FaHeart className={`text-xs sm:text-sm transition-transform ${isWishlisted ? "scale-110" : ""}`} />
              </button>
            )}

            {/* 3-Dots Menu ⋮ Button for Report */}
            {onOpenReportModal && (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowMenu(!showMenu);
                  }}
                  className="p-2 sm:p-2.5 rounded-full bg-white/80 backdrop-blur-md text-gray-600 hover:text-gray-900 hover:bg-white transition-all duration-300 shadow-md cursor-pointer"
                  title="More Options"
                >
                  <FaEllipsisV className="text-xs sm:text-sm" />
                </button>

                {showMenu && (
                  <div className="absolute right-0 top-11 w-44 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 p-1.5 z-30 animate-fade-in">
                    <button
                      disabled={isReported}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowMenu(false);
                        if (!isReported) {
                          onOpenReportModal(product);
                        }
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                        isReported
                          ? "text-amber-600 bg-amber-50 cursor-not-allowed"
                          : "text-red-600 hover:bg-red-50 cursor-pointer"
                      }`}
                    >
                      <FaFlag className="text-xs" />
                      <span>{isReported ? "Already Reported ⚠️" : "Report Product"}</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-3 sm:p-4 flex flex-col justify-between flex-grow">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-gray-500 truncate">
                <FaLocationDot className="text-[#F4A261] shrink-0" />
                <span className="truncate">{product.location}</span>
              </span>
            </div>

            <h2 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 group-hover:text-[#2E7D32] transition-colors line-clamp-1">
              {product.productName}
            </h2>

            <p className="text-gray-500 text-xs sm:text-sm mt-1.5 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-gray-400 flex items-center gap-1">
              <FaExchangeAlt className="text-[#2E7D32]" /> Exchange For
            </p>
            <p className="font-semibold text-xs sm:text-sm text-[#F4A261] mt-0.5 truncate">
              {product.exchangeFor}
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-3 sm:p-4 pt-0">
        <Link
          to={`/product/${product._id}`}
          className="w-full bg-[#2E7D32] border-2 border-[#2E7D32] hover:bg-[#236327] hover:border-[#236327] text-white font-bold py-2.5 rounded-xl md:rounded-2xl shadow-md shadow-[#2E7D32]/20 hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 transition-all duration-300 ease-out text-xs sm:text-sm text-center block"
        >
          View Details &rarr;
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;