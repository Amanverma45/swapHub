import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLocationDot } from "react-icons/fa6";

const ProductCard = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.25 }}
      whileHover={{
        y: -5,
        scale: 1.015,
        boxShadow: "0 18px 35px rgba(0,0,0,0.14)",
      }}
      className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm transition-all duration-200"
    >
      <div className="h-56 md:h-64 overflow-hidden">
        <img
          src={product.image}
          alt={product.productName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-5">

        <div className="flex justify-between items-center mb-3">

          <span className="bg-green-100 text-[#2E7D32] px-3 py-1 rounded-full text-sm font-medium">
            {product.category}
          </span>

          <span className="flex items-center gap-1 text-sm text-gray-500">
            <FaLocationDot className="text-[#F4A261]" />
            {product.location}
          </span>

        </div>

        <h2 className="text-xl font-bold text-gray-800">
          {product.productName}
        </h2>

        <p className="text-gray-500 mt-3 leading-6 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4">

          <p className="text-xs uppercase tracking-wide text-gray-400">
            Exchange For
          </p>

          <p className="font-semibold text-[#F4A261] mt-1">
            {product.exchangeFor}
          </p>

        </div>

        <Link
          to={`/product/${product._id}`}
          className="mt-6 block text-center bg-[#2E7D32] text-white py-3 rounded-xl hover:bg-[#256728] hover:scale-105 active:scale-95 transition-all duration-300"
        >
          View Details
        </Link>

      </div>
    </motion.div>
  );
};

export default ProductCard;