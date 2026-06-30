import { useEffect, useState } from 'react'
import axios from '../utils/axiosInstance';
import toast from 'react-hot-toast';

const SwapRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSwapRequests = async () => {
    try {
      const response = await axios.get("/getSwapRequest");
      setRequests(response.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getSwapRequests();
  }, []);
  return (
    <section className="w-[90%] max-w-7xl mx-auto py-16">

      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Swap Requests
        </h1>

        <p className="text-gray-600 mt-2">
          Manage all incoming swap requests.
        </p>
      </div>

      {loading ? (
        <h2 className="text-center text-xl">
          Loading...
        </h2>
      ) : requests.length === 0 ? (
        <h2 className="text-center text-xl">
          No Swap Requests
        </h2>
      ) : (
        <div className="space-y-8">
          {requests.map((request) => (
            <div
              key={request._id}
              className="bg-white rounded-3xl shadow-md border p-6">
              <div className="flex justify-between items-center mb-6">

                <div>
                  <h2 className="text-2xl font-bold">
                    {request.sender.name}
                  </h2>

                  <p className="text-gray-500">
                    {request.sender.email}
                  </p>
                </div>
                <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                  {request.status}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="border rounded-2xl p-4">

                  <h3 className="font-bold text-lg mb-4">
                    Requested Product
                  </h3>

                  <img
                    src={request.requestedProduct.image}
                    alt={request.requestedProduct.productName}
                    className="w-full h-52 object-cover rounded-xl"
                  />

                  <h4 className="text-xl font-semibold mt-4">
                    {request.requestedProduct.productName}
                  </h4>

                  <p className="text-gray-600">
                    {request.requestedProduct.category}
                  </p>

                  <p className="text-gray-600">
                    📍 {request.requestedProduct.location}
                  </p>

                </div>


                <div className="border rounded-2xl p-4">

                  <h3 className="font-bold text-lg mb-4">
                    Offered Product
                  </h3>

                  <img
                    src={request.offeredProduct.image}
                    alt={request.offeredProduct.productName}
                    className="w-full h-52 object-cover rounded-xl"
                  />

                  <h4 className="text-xl font-semibold mt-4">
                    {request.offeredProduct.productName}
                  </h4>

                  <p className="text-gray-600">
                    {request.offeredProduct.category}
                  </p>

                  <p className="text-gray-600">
                    📍 {request.offeredProduct.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SwapRequests;
