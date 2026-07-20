import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLocationDot } from "react-icons/fa6";
import { FaExchangeAlt } from "react-icons/fa";

const ProductCard = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.25 }}
      whileHover={{
        y: -6,
        scale: 1.015,
        boxShadow: "0 20px 40px rgba(46,125,50,0.15)",
      }}
      className="group relative bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-gray-100 border-t-4 border-t-[#2E7D32] shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full"
    >
      <div>
        {/* Product Image with Hover Zoom */}
        <div className="relative h-44 sm:h-52 md:h-60 overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.productName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md text-[#2E7D32] border border-[#2E7D32]/20 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold shadow-xs">
            {product.category}
          </span>
        </div>

        {/* Product Info */}
        <div className="p-3.5 sm:p-5 flex flex-col justify-between flex-grow">
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
      <div className="p-3.5 sm:p-5 pt-0">
        <Link
          to={`/product/${product._id}`}
          className="w-full bg-[#2E7D32] border-2 border-[#2E7D32] hover:bg-[#236327] hover:border-[#236327] text-white font-bold py-2.5 rounded-xl md:rounded-2xl shadow-md shadow-[#2E7D32]/20 hover:scale-105 active:scale-95 transition-all duration-200 text-xs sm:text-sm text-center block"
        >
          View Details &rarr;
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;