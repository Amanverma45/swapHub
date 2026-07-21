import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { FaExchangeAlt, FaRegClock, FaTrashAlt, FaCheck, FaTimes } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

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
      <section className="min-h-screen bg-gray-50/60 py-8 sm:py-12 px-4">
        <div className="w-[92%] max-w-6xl mx-auto space-y-8 sm:space-y-10">

          {/* Top Banner Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden bg-gradient-to-r from-[#2E7D32] via-[#256728] to-[#1E5621] rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-[#2E7D32]/15 border border-emerald-600/30"
          >
            {/* Ambient Light Orb */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/15 text-emerald-100 border border-white/20 mb-3 shadow-xs">
                Inbox Requests
              </span>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                Swap Requests
              </h1>
              <p className="mt-2 sm:mt-3 text-sm sm:text-lg text-emerald-100/90 max-w-2xl font-medium leading-relaxed">
                Manage and respond to incoming swap offers sent by community members.
              </p>
            </div>
          </motion.div>

          {/* Content Section */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white/80 backdrop-blur-md rounded-3xl border border-gray-100 shadow-sm">
              <div className="w-12 h-12 border-4 border-[#2E7D32] border-t-transparent rounded-full animate-spin shadow-md mb-4" />
              <p className="text-gray-600 font-bold text-sm">
                Fetching incoming swap requests...
              </p>
            </div>
          ) : requests.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-14 text-center shadow-md max-w-xl mx-auto"
            >
              <div className="w-16 h-16 bg-emerald-50 text-[#2E7D32] rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 border border-emerald-100">
                <FaExchangeAlt />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                No Incoming Swap Requests
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed font-medium">
                When other users send exchange offers for your products, they will appear here for you to accept or decline.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {requests.map((request) => (
                <motion.div
                  key={request._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 p-5 sm:p-8 overflow-hidden"
                >
                  {/* Header Row: Sender Info & Status Badge */}
                  <div className="flex flex-wrap justify-between items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        Offered By Member
                      </span>
                      <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 mt-0.5">
                        {request.sender?.name || "User"}
                      </h2>
                      <p className="text-xs text-gray-500 font-medium">
                        {request.sender?.email}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      {/* Status Pill */}
                      <span
                        className={`px-4 py-1.5 rounded-full font-bold text-xs sm:text-sm border flex items-center gap-2 shadow-2xs capitalize ${
                          request.status === "accepted"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : request.status === "rejected"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full animate-pulse ${
                            request.status === "accepted"
                              ? "bg-emerald-600"
                              : request.status === "rejected"
                              ? "bg-red-600"
                              : "bg-amber-500"
                          }`}
                        />
                        {request.status}
                      </span>

                      <span className="text-[10px] font-semibold text-gray-400 flex items-center gap-1 mt-1">
                        <FaRegClock />
                        {new Date(request.createdAt).toLocaleDateString("en-GB")}
                      </span>
                    </div>
                  </div>

                  {/* Requested Product vs Offered Product Grid */}
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6 relative">
                    {/* Floating Central Exchange Icon Badge */}
                    <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-[#2E7D32] to-[#1E5621] text-white items-center justify-center shadow-lg border-2 border-white z-10 pointer-events-none">
                      <FaExchangeAlt className="text-sm" />
                    </div>

                    {/* Requested Product (Your Item) */}
                    <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-4 transition hover:bg-emerald-50/70 flex flex-col justify-between">
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/20 mb-3 shadow-2xs">
                          Your Requested Item
                        </span>

                        {request.requestedProduct ? (
                          <>
                            <div className="w-full h-44 sm:h-52 rounded-xl overflow-hidden bg-white border border-gray-100 relative group">
                              <img
                                src={request.requestedProduct.image}
                                alt={request.requestedProduct.productName}
                                onClick={() => setPreviewImage(request.requestedProduct.image)}
                                className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-[#2E7D32] mt-3 truncate">
                              {request.requestedProduct.productName}
                            </h3>

                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-emerald-100/60">
                              <span className="text-[11px] font-bold text-gray-500 bg-white px-2.5 py-0.5 rounded-full border border-gray-200">
                                {request.requestedProduct.category}
                              </span>
                              <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                                <FaLocationDot className="text-[#F4A261]" />
                                {request.requestedProduct.location}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-44 sm:h-52 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/60 flex flex-col items-center justify-center text-center p-4">
                            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl mb-2 shadow-xs">
                              <FaTrashAlt />
                            </div>
                            <p className="text-xs font-bold text-emerald-800">Product Removed</p>
                            <p className="text-[11px] text-emerald-600/90 mt-0.5">Deleted by you</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Offered Product (Member's Item) */}
                    <div className="bg-gray-50/70 border border-gray-100 rounded-2xl p-4 transition hover:bg-gray-50 flex flex-col justify-between">
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white text-gray-700 border border-gray-200 mb-3 shadow-2xs">
                          Member's Offered Product
                        </span>

                        {request.offeredProduct ? (
                          <>
                            <div className="w-full h-44 sm:h-52 rounded-xl overflow-hidden bg-white border border-gray-100 relative group">
                              <img
                                src={request.offeredProduct.image}
                                alt={request.offeredProduct.productName}
                                onClick={() => setPreviewImage(request.offeredProduct.image)}
                                className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 mt-3 truncate">
                              {request.offeredProduct.productName}
                            </h3>

                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200/60">
                              <span className="text-[11px] font-bold text-gray-500 bg-white px-2.5 py-0.5 rounded-full border border-gray-200">
                                {request.offeredProduct.category}
                              </span>
                              <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                                <FaLocationDot className="text-[#F4A261]" />
                                {request.offeredProduct.location}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-44 sm:h-52 rounded-xl border border-dashed border-gray-300 bg-gray-100/70 flex flex-col items-center justify-center text-center p-4">
                            <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xl mb-2 shadow-xs">
                              <FaTrashAlt />
                            </div>
                            <p className="text-xs font-bold text-gray-700">Product Removed</p>
                            <p className="text-[11px] text-gray-500 mt-0.5">Deleted by {request.sender?.name || "sender"}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Accept / Reject Action Buttons */}
                  {request.status === "pending" && (
                    <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 pt-5 border-t border-gray-100">
                      <button
                        disabled={actionLoading !== ""}
                        onClick={() => handleAccept(request._id)}
                        className="flex-1 sm:flex-none sm:w-44 bg-gradient-to-r from-[#2E7D32] to-[#1E5621] hover:from-[#256728] hover:to-[#164219] text-white font-bold py-3 rounded-2xl shadow-lg shadow-[#2E7D32]/25 hover:shadow-xl hover:scale-105 active:scale-95 disabled:opacity-70 transition-all duration-200 text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {actionLoading === `accept-${request._id}` ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            <span>Accepting...</span>
                          </>
                        ) : (
                          <>
                            <FaCheck className="text-xs" />
                            <span>Accept Swap</span>
                          </>
                        )}
                      </button>

                      <button
                        disabled={actionLoading !== ""}
                        onClick={() => handleReject(request._id)}
                        className="flex-1 sm:flex-none sm:w-44 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 rounded-2xl shadow-lg shadow-red-500/25 hover:shadow-xl hover:scale-105 active:scale-95 disabled:opacity-70 transition-all duration-200 text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {actionLoading === `reject-${request._id}` ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            <span>Rejecting...</span>
                          </>
                        ) : (
                          <>
                            <FaTimes className="text-xs" />
                            <span>Decline Offer</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <button
            onClick={() => setPreviewImage(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 text-white text-xl flex items-center justify-center hover:bg-white/40 transition font-bold"
          >
            ✕
          </button>

          <img
            src={previewImage}
            alt="Preview"
            className="max-w-[90%] max-h-[85vh] rounded-3xl shadow-2xl border border-white/20 object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default SwapRequests;
