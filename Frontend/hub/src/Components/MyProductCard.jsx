import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEdit, FaTrash, FaExchangeAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const MyProductCard = ({ product, handleDelete, index }) => {
  const orangeCategories = ["mobiles", "gaming", "home items"];
  const isOrange = orangeCategories.includes(product.category?.toLowerCase());
  const borderColor = isOrange ? "border-t-[#F4A261]" : "border-t-[#2E7D32]";
  const hoverShadow = isOrange 
    ? "0px 20px 40px rgba(244,162,97,0.18)" 
    : "0px 20px 40px rgba(46,125,50,0.15)";
  
  // Staggered delay based on grid column position
  const delay = Math.min((index % 3) * 0.06, 0.18);

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
          <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md text-[#2E7D32] border border-[#2E7D32]/20 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold shadow-xs">
            {product.category}
          </span>
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

          {/* Exchange Target Section */}
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

      {/* Action Buttons: View, Edit, Delete */}
      <div className="p-3 sm:p-4 pt-0">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <Link
            to={`/product/${product._id}`}
            className="flex items-center justify-center gap-1 sm:gap-1.5 bg-gradient-to-r from-[#2E7D32] to-[#1E5621] hover:from-[#256728] hover:to-[#164219] text-white py-2 sm:py-2.5 px-2 rounded-xl md:rounded-2xl shadow-md shadow-[#2E7D32]/20 hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ease-out text-xs font-bold text-center whitespace-nowrap cursor-pointer"
          >
            <FaEye className="text-xs sm:text-sm" />
            <span>View</span>
          </Link>

          <Link
            to={`/editProduct/${product._id}`}
            className="flex items-center justify-center gap-1 sm:gap-1.5 bg-gradient-to-r from-[#F4A261] to-[#D97706] hover:from-[#e7914e] hover:to-[#b46002] text-white py-2 sm:py-2.5 px-2 rounded-xl md:rounded-2xl shadow-md shadow-[#F4A261]/20 hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ease-out text-xs font-bold text-center whitespace-nowrap cursor-pointer"
          >
            <FaEdit className="text-xs sm:text-sm" />
            <span>Edit</span>
          </Link>

          <button
            onClick={() => handleDelete(product._id)}
            className="flex items-center justify-center gap-1 sm:gap-1.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2 sm:py-2.5 px-2 rounded-xl md:rounded-2xl shadow-md shadow-red-500/20 hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ease-out text-xs font-bold text-center whitespace-nowrap cursor-pointer"
          >
            <FaTrash className="text-xs sm:text-sm" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MyProductCard;