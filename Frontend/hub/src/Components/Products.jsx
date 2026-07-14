import { useState, useEffect } from "react";
import axios from '../utils/axiosInstance.js';
import ProductCard from "./ProductCard";
import toast from "react-hot-toast";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true)

  const getProducts = async () => {
    try {
      const response = await axios.get("/getProduct");

      setProducts(response.data)
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
  return (
    <section className="w-[90%] max-w-7xl mx-auto py-16">

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">
          Explore Products
        </h1>

        <p className="text-gray-600 mt-3">
          {products.length} {products.length === 1 ? "Product" : "Products"} Available
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">

          <div className="w-10 h-10 border-4 border-[#2E7D32] border-t-transparent rounded-full animate-spin"></div>

          <p className="mt-4 text-gray-600">
            Loading Products...
          </p>

        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">

          <div className="text-6xl">
            📦
          </div>

          <h2 className="text-2xl font-bold mt-5">
            No Products Found
          </h2>

          <p className="text-gray-500 mt-2">
            Products will appear here once available.
          </p>

        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}

    </section>
  );
};

export default Products;