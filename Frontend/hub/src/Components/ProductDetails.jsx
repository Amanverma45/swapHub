import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from '../utils/axiosInstance.js';
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const [myProducts, setMyProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState("")

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const isOwner = product?.owner === loggedInUser?._id;

  const getMyProducts = async () => {
    try {
      const response = await axios.get("/myProducts");
      setMyProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getSingleProduct = async () => {
    try {
      const response = await axios.get(`/getProduct/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const sendSwapRequest = async () => {

    if (!selectedProduct) {
      toast.error("Please select your product");
      return;
    }

    try {

      const response = await axios.post("/swapProduct", {
        receiver: product.owner,
        requestedProduct: product._id,
        offeredProduct: selectedProduct,
      });

      toast.success(response.data.message);

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getSingleProduct();
    getMyProducts();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="w-10 h-10 border-4 border-[#2E7D32] border-t-transparent rounded-full animate-spin"></div>

        <p className="mt-4 text-gray-600">
          Loading Product...
        </p>
      </div>
    );
  }
  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

        <div className="grid md:grid-cols-2">

          <div className="h-[420px] md:h-[500px] bg-gray-50 rounded-2xl flex items-center justify-center p-8">
            <img
              src={product.image}
              alt={product.productName}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div className="p-8">

            <span className="inline-block bg-green-100 text-[#2E7D32] px-4 py-1 rounded-full text-sm font-semibold">
              {product.category}
            </span>

            <h1 className="text-3xl md:text-4xl font-bold mt-4font-bold mt-4">
              {product.productName}
            </h1>

            <div className="mt-6 space-y-4">

              <div className="flex items-center">
                <span className="w-36 font-semibold text-gray-700">
                  Exchange For
                </span>

                <span className="text-[#F4A261] font-semibold">
                  {product.exchangeFor}
                </span>
              </div>

              <div className="flex items-center">
                <span className="w-36 font-semibold text-gray-700">
                  Location
                </span>

                <span className="text-gray-600">
                  {product.location}
                </span>
              </div>

              <div className="flex items-center">
                <span className="w-36 font-semibold text-gray-700">
                  Posted On
                </span>

                <span className="text-gray-600">
                  {new Date(product.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="mt-8">

                <h3 className="font-semibold text-gray-700 mb-3">
                  Description
                </h3>

                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 leading-7 text-gray-600">
                  {product.description}
                </div>

              </div>

            </div>
            {!isOwner && (
              <div className="mt-8 border-t border-gray-200 pt-8">

                {myProducts.length === 0 ? (

                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">

                    <h3 className="font-semibold text-yellow-800">
                      No Products Available
                    </h3>

                    <p className="text-sm text-yellow-700 mt-2 leading-6">
                      You need to add at least one product before sending a swap request.
                    </p>

                    <Link
                      to="/addProduct"
                      className="inline-block mt-4 bg-[#2E7D32] text-white px-5 py-2 rounded-xl hover:bg-[#256728] transition"
                    >
                      Add Product
                    </Link>
                  </div>

                ) : (

                  <>
                    <label className="block font-semibold text-gray-700 mb-3">
                      Choose a Product to Exchange
                    </label>

                    <select
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
                    >
                      <option value="">Select Product</option>

                      {myProducts.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.productName}
                        </option>
                      ))}

                    </select>

                    <button
                      onClick={sendSwapRequest}
                      className="mt-6 w-full bg-[#2E7D32] hover:bg-[#256728] text-white py-3 rounded-xl transition-all duration-300"
                    >
                      Send Swap Request
                    </button>

                  </>

                )}

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

export default ProductDetails;