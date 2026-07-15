import { useEffect, useState } from 'react'
import axios from '../utils/axiosInstance';
import toast from 'react-hot-toast';
import { MdLocationOn } from "react-icons/md";

const SwapRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);

  const [actionLoading, setActionLoading] = useState("");

  const getSwapRequests = async () => {
    try {
      const response = await axios.get("/getSwapRequest");
      setRequests(response.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleAccept = async (id) => {
    setActionLoading(`accept-${id}`);
    try {
      const response = await axios.put(`/acceptSwapRequest/${id}`);
      toast.success(response.data.message);
      getSwapRequests();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setActionLoading("");
    }
  };
  const handleReject = async (id) => {
    setActionLoading(`reject-${id}`);

    try {
      const response = await axios.put(`/rejectSwapRequest/${id}`);

      toast.success(response.data.message);

      getSwapRequests();

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);

    } finally {
      setActionLoading("");
    }
  };
  useEffect(() => {
    getSwapRequests();
  }, []);
  return (
    <>
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
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-10 h-10 border-4 border-[#2E7D32] border-t-transparent rounded-full animate-spin"></div>

            <p className="mt-4 text-gray-600">
              Loading Swap Requests...
            </p>
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm py-16 text-center">
            <div className="text-5xl mb-4">📦</div>

            <h2 className="text-2xl font-bold text-gray-800">
              No Swap Requests Yet
            </h2>

            <p className="text-gray-500 mt-3">
              Incoming swap requests will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-8">

            {requests
              .filter(
                (request) => request.requestedProduct && request.offeredProduct
              )
              .map((request) => (
                <div
                  key={request._id}
                  className="bg-white rounded-xl min-h-[500px] md:min-h-[650px] shadow-lg border border-gray-200 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 md:gap-2 items-start">

                    <div className="bg-green-50 p-3 border-b border-green-100 rounded-t-xl">
                      <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                        {request.sender.name}
                      </h2>

                      <p className="text-sm md:text-base text-gray-500 break-all mt-1">
                        {request.sender.email}
                      </p>

                      <div className="px-3 md:px-5 pt-2 md:pt-4">
                        <span
                          className={`inline-flex items-center -ml-4  px-4 py-2 rounded-full text-xs md:text-sm md:-ml-5 font-semibold ${request.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : request.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                          {request.status === "pending"
                            ? "Pending"
                            : request.status === "accepted"
                              ? "Accepted"
                              : "Rejected"}
                        </span>
                      </div>
                      <div className="mt-4 text-sm text-gray-500">
                        <span className="font-medium text-gray-700">
                          Requested On:
                        </span>{" "}
                        {new Date(request.createdAt).toLocaleDateString("en-GB")}
                      </div>
                    </div>

                  </div>

                  <div className="flex justify-center gap-2 mt-4 md:gap-8 md:py-2 ">

                    {/* Requested Product */}
                   <div className="border border-gray-200 w-[500px] md:h-[430px] p-4 rounded-xl hover:shadow-xl transition-all duration-300">
                      <h3 className="font-bold ml-2 mt-1 md:ml-0 text-sm md:text-lg mb-4">
                        Requested Product
                      </h3>

                      <div className="w-full h-56 overflow-hidden rounded-xl border border-transparent hover:border-green-300">
                        <img
                          src={request.requestedProduct.image}
                          onClick={() => setPreviewImage(request.requestedProduct.image)}
                          className="w-full h-full object-cover cursor-pointer hover:scale-105 transition duration-300"
                        />
                      </div>

                      <h4 className="text-sm md:text-lg font-semibold ml-2 md:ml-0 mt-4">
                        {request.requestedProduct.productName}
                      </h4>

                      <p className="mt-2 ml-2 md:ml-0 inline-block bg-green-100 text-green-700 rounded-xl px-3 py-1 text-xs md:text-sm">
                        {request.requestedProduct.category}
                      </p>

                      <p className="flex items-center gap-1 mt-2 ml-2 md:ml-0 text-sm text-gray-600">
                        <MdLocationOn className="text-[#2E7D32]" />
                        {request.requestedProduct.location}
                      </p>

                    </div>

                    {/* Offered Product */}
                   <div className="border border-gray-200 w-[500px] md:h-[430px] p-4 rounded-xl hover:shadow-xl transition-all duration-300">
                      <h3 className="font-bold ml-2 mt-1 md:ml-0 text-sm md:text-lg mb-4">
                        Offered Product
                      </h3>

                      <div className="w-full h-56 overflow-hidden rounded-xl border border-transparent hover:border-green-300">
                        <img
                          src={request.offeredProduct.image}
                          onClick={() => setPreviewImage(request.offeredProduct.image)}
                          className="w-full h-full object-cover cursor-pointer hover:scale-105 transition duration-300"
                        />
                      </div>

                      <h4 className="text-sm md:text-lg font-semibold ml-2 md:ml-0 mt-4">
                        {request.offeredProduct.productName}
                      </h4>

                      <p className="mt-2 ml-2 md:ml-0 inline-block bg-green-100 text-green-700 rounded-xl px-3 py-1 text-xs md:text-sm">
                        {request.offeredProduct.category}
                      </p>

                      <p className="flex items-center gap-1 mt-2 ml-2 md:ml-0 text-sm text-gray-600">
                        <MdLocationOn className="text-[#2E7D32]" />
                        {request.offeredProduct.location}
                      </p>

                    </div>

                  </div>
                  {request.status === "pending" && (
                    <div className="flex justify-center gap-2 md:gap-4 mt-5 md:mt-6 pb-4">
                      <button
                        disabled={actionLoading !== ""}
                        onClick={() => handleAccept(request._id)}
                        className="w-36 md:w-40 bg-[#2E7D32] hover:bg-[#256728] disabled:opacity-70 text-white py-2 md:py-3 rounded-xl transition-all duration-300 active:scale-[0.98] font-medium"
                      >
                        {actionLoading === `accept-${request._id}` ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Accepting...
                          </span>
                        ) : (
                          "Accept"
                        )}
                      </button>

                      <button
                        disabled={actionLoading !== ""}
                        onClick={() => handleReject(request._id)}
                        className="w-36 md:w-40 bg-red-500 hover:bg-red-600 disabled:opacity-70 text-white py-2 md:py-3 rounded-xl transition-all duration-300 active:scale-[0.98] font-medium"
                      >
                        {actionLoading === `reject-${request._id}` ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Rejecting...
                          </span>
                        ) : (
                          "Reject"
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </section>
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <button
            onClick={() => setPreviewImage(null)}
            className="absolute top-5 right-5 text-white text-4xl"
          >
            ✕
          </button>

          <img
            src={previewImage}
            className="max-w-[90%] max-h-[90%] rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

        </div>
      )}
    </>
  );
};

export default SwapRequests;
