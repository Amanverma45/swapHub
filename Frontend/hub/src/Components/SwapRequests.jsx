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
  const handleAccept = async (id) => {
    try {
      const response = await axios.put(`/acceptSwapRequest/${id}`);

      toast.success(response.data.message);

      getSwapRequests();

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };
  const handleReject = async (id) => {
    try {
      const response = await axios.put(`/rejectSwapRequest/${id}`);

      toast.success(response.data.message);

      getSwapRequests();

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
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
                <span
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
    ${request.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : request.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full
      ${request.status === "accepted"
                        ? "bg-green-600"
                        : request.status === "rejected"
                          ? "bg-red-600"
                          : "bg-yellow-500"
                      }`}
                  ></span>

                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
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
              {request.status === "pending" && (
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={() => handleAccept(request._id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl transition">
                    Accept
                  </button>

                  <button
                    onClick={() => handleReject(request._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl transition">
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SwapRequests;
