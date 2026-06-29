import { Link } from "react-router-dom";

const MyProductCard = ({ product, handleDelete }) => {
  return (
    <div className="bg-white rounded-3xl shadow-md border overflow-hidden">

      <img
        src={product.image}
        alt={product.productName}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">

        <h2 className="text-xl font-bold">
          {product.productName}
        </h2>

        <p className="text-gray-600 mt-2">
          {product.description}
        </p>

        <div className="flex gap-3 mt-6">

          <Link
            to={`/product/${product._id}`}
            className="flex-1 bg-[#2E7D32] text-white text-center py-2 rounded-xl"
          >
            View
          </Link>

          <button
            className="flex-1 bg-blue-500 text-white py-2 rounded-xl"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(product._id)}
            className="flex-1 bg-red-500 text-white py-2 rounded-xl"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
};

export default MyProductCard;