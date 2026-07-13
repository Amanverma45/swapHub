import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {FaEye,FaEdit,FaTrash,FaTag,FaMapMarkerAlt,FaExchangeAlt,} from "react-icons/fa";

const MyProductCard = ({ product, handleDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      whileHover={{
        y: -5,
        scale: 1.015,
        boxShadow: "0 18px 35px rgba(0,0,0,0.14)",
      }}
      className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-200"
    >
      <img
        src={product.image}
        alt={product.productName}
        className="w-full h-56 md:h-64 object-cover"
      />

      <div className="p-5 flex flex-col">

        <h2 className="text-xl font-bold text-gray-800 truncate">
          {product.productName}
        </h2>

        <p
          className="text-gray-600 text-sm leading-6 mt-2 min-h-[48px]"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.description}
        </p>

        <div className="space-y-2 mt-4 text-sm">

          <div className="flex items-center gap-2 text-gray-600">
            <FaTag className="text-[#2E7D32]" />
            <span>{product.category}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <FaMapMarkerAlt className="text-[#F4A261]" />
            <span>{product.location}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <FaExchangeAlt className="text-[#2E7D32]" />
            <span>{product.exchangeFor}</span>
          </div>

        </div>

        <div className="grid grid-cols-3 gap-3 mt-6">

          <Link
            to={`/product/${product._id}`}
            className="flex items-center justify-center gap-2 bg-[#2E7D32] hover:bg-[#256728] text-white py-3 rounded-xl transition-all duration-300 text-sm font-medium"
          >
            <FaEye />
            <span>View</span>
          </Link>

          <Link
            to={`/editProduct/${product._id}`}
            className="flex items-center justify-center gap-2 bg-[#F4A261] hover:bg-[#E6904F] text-white py-3 rounded-xl transition-all duration-300 text-sm font-medium"
          >
            <FaEdit />
            <span>Edit</span>
          </Link>

          <button
            onClick={() => handleDelete(product._id)}
            className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition-all duration-300 text-sm font-medium"
          >
            <FaTrash />
            <span>Delete</span>
          </button>

        </div>

      </div>
    </motion.div>
  );
};

export default MyProductCard;