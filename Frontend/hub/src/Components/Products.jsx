import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true)

  const getProducts = async () => {
    try {
      const response = await axios.get('https://swaphub-backend-855x.onrender.com/api/getProduct');

      setProducts(response.data)
    } catch (error) {
      console.log(error)
      alert('unable to fetch products')
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts
    // getProducts();
  }, []);
  return (
    <section className="w-[90%] max-w-7xl mx-auto py-16">

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">
          Explore Products
        </h1>

        <p className="text-gray-600 mt-3">
          Browse products available for swapping.
        </p>
      </div>

      {loading ? (
        <h2 className="text-center text-xl">
          Loading Products...
        </h2>
      ) : products.length === 0 ? (
        <h2 className="text-center text-xl">
          No Products Found
        </h2>
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