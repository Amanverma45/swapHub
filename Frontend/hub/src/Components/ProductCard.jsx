import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";

const ProductCard = ({ product }) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-md
        hover:shadow-xl hover:-translate-y-2 transition-all duration-300
    ">
      <div className="h-60 overflow-hidden">
        <img
          src={product.image}
          alt={product.productName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <span className="bg-green-100 text-[#2E7D32] px-3 py-1 rounded-full text-sm font-medium">
            {product.category}
          </span>
          <span className="text-gray-500 text-sm">
            <FaLocationDot /> {product.location}
          </span>
        </div>

        <h2 className="text-xl font-bold text-gray-800">
          {product.productName}
        </h2>

        <p className="text-gray-500 mt-3 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4">
          <p className="text-sm text-gray-500">
            Exchange For
          </p>

          <p className="font-semibold text-[#F4A261]">
            {product.exchangeFor}
          </p>
        </div>
        <Link
          to={`/product/${product._id}`}
          className="mt-6 block text-center bg-[#2E7D32] text-white py-3 rounded-xl hover:bg-[#256728] hover:scale-105 transition-all duration-300"
        >
          View Details
        </Link>

      </div>

    </div>
  );
};

export default ProductCard;