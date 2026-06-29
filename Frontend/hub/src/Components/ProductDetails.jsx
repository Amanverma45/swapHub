import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const getSingleProduct = async () => {
        try {
            const response = await axios.get(
                `https://swaphub-backend-855x.onrender.com/api/getProduct/${id}`
            );

            setProduct(response.data);
        } catch (error) {
            console.log(error);
            console.log(error.response);
            alert(error.response?.data?.message || error.message);
            alert("Unable to fetch product");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSingleProduct();
    }, []);

    if (loading) {
        return (
            <h2 className="text-center text-2xl mt-10">
                Loading...
            </h2>
        );
    }

   return (
  <section className="min-h-screen bg-gray-100 py-10 px-4">
    <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">

      <div className="grid md:grid-cols-2">

        {/* Left Image */}
        <div className="bg-gray-100 p-6 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.productName}
            className="w-full max-h-[500px] object-contain rounded-2xl"
          />
        </div>

        {/* Right Details */}
        <div className="p-8">

          <span className="inline-block bg-green-100 text-[#2E7D32] px-4 py-1 rounded-full text-sm font-semibold">
            {product.category}
          </span>

          <h1 className="text-4xl font-bold mt-4">
            {product.productName}
          </h1>

          <div className="mt-6 space-y-4">

            <div>
              <h3 className="font-semibold text-gray-700">
                Exchange For
              </h3>

              <p className="text-[#F4A261] font-medium">
                {product.exchangeFor}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700">
                Location
              </h3>

              <p className="text-gray-600">
                📍 {product.location}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700">
                Description
              </h3>

              <p className="text-gray-600 leading-7">
                {product.description}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700">
                Posted On
              </h3>

              <p className="text-gray-600">
                {new Date(product.createdAt).toLocaleDateString()}
              </p>
            </div>

          </div>

          <button
            className="mt-8 w-full bg-[#2E7D32] hover:bg-[#256728] text-white py-4 rounded-2xl transition duration-300"
          >
            Send Swap Request
          </button>

        </div>

      </div>

    </div>
  </section>
);
};

export default ProductDetails;