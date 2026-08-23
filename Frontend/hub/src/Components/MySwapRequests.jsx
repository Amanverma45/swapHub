import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { FaBell, FaExchangeAlt, FaRegClock, FaArrowRight, FaTrashAlt } from "react-icons/fa";

const MySwapRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();

  // Rating & Review State
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewSwapId, setReviewSwapId] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  const handleSubmitReview = async () => {
    if (!reviewText.trim()) {
      toast.error("Please enter a short review");
      return;
    }
    setSubmittingReview(true);
    try {
      const response = await axios.post("/reviews", {
        swapRequestId: reviewSwapId,
        rating: reviewRating,
        reviewText: reviewText.trim()
      });
      toast.success(response.data.message);
      setShowReviewModal(false);
      setReviewText("");
      setReviewRating(5);
      getMySwapRequests();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleStartChat = async (receiverId) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!token || !user._id) {
      toast.error("Please login to chat");
      return;
    }
    try {
      const response = await axios.post("/createChat", {
        senderId: user._id,
        receiverId,
      });
      navigate("/chat", { state: { activeChatId: response.data._id } });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Could not start chat");
    }
  };

  const getMySwapRequests = async () => {
    try {
      const response = await axios.get("/mySwapRequests");

      setRequests(response.data);

      const count = response.data.filter(
        (item) =>
          item.status === "accepted" || item.status === "rejected"
      ).length;

      setNotificationCount(count);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMySwapRequests();
  }, []);

  return (
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
              Swap Tracker
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              My Swap Requests
            </h1>
            <p className="mt-2 sm:mt-3 text-sm sm:text-lg text-emerald-100/90 max-w-2xl font-medium leading-relaxed">
              Track all swap requests you have sent to other members and stay updated on their responses.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 bg-white text-[#2E7D32] px-4 py-2 rounded-full font-bold text-xs sm:text-sm shadow-md">
              <FaBell className="text-sm text-[#F4A261] animate-bounce" />
              <span>Response Updates: {notificationCount}</span>
            </div>
          </div>
        </motion.div>

        {/* Toggle Navigation Tabs */}
        <div className="flex items-center justify-center p-1.5 bg-gray-100/70 border border-gray-200/50 rounded-2xl max-w-md mx-auto shadow-2xs">
          <button
            onClick={() => navigate("/swapRequest")}
            className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-center transition-all text-gray-600 hover:text-[#2E7D32] hover:bg-emerald-50/50 cursor-pointer"
          >
            📥 Received Offers (Inbox)
          </button>
          <button
            onClick={() => navigate("/mySwapRequests")}
            className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-center transition-all bg-white text-[#2E7D32] shadow-sm border border-gray-200/40 cursor-pointer"
          >
            📤 Sent Tracker
          </button>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/80 backdrop-blur-md rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 border-4 border-[#2E7D32] border-t-transparent rounded-full animate-spin shadow-md mb-4" />
            <p className="text-gray-600 font-bold text-sm">
              Fetching your swap requests...
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
              No Swap Requests Sent Yet
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed font-medium">
              Browse available items in the marketplace and send an exchange request to start swapping!
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#2E7D32] to-[#1E5621] hover:from-[#256728] hover:to-[#164219] text-white font-bold px-6 py-3 rounded-full text-xs sm:text-sm shadow-lg shadow-[#2E7D32]/25 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span>Browse Marketplace</span>
              <FaArrowRight className="text-xs" />
            </Link>
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
                {/* Header Row: Member Info & Status */}
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        Product Owner
                      </span>
                      <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 mt-0.5">
                        {request.receiver?.name || "User"}
                      </h2>
                      <p className="text-xs text-gray-500 font-medium">
                        {request.receiver?.email}
                      </p>
                    </div>

                    <button
                      onClick={() => handleStartChat(request.receiver?._id)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white transition-all shadow-2xs border border-emerald-100 cursor-pointer text-xs font-bold flex items-center justify-center"
                      title="Chat with Owner"
                    >
                      Chat
                    </button>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`px-4 py-1.5 rounded-full font-bold text-xs sm:text-sm border flex items-center gap-2 shadow-2xs capitalize ${
                      request.status === "accepted"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : request.status === "rejected"
                        ? "bg-red-50 text-red-700 border-red-200"
                        : request.status === "expired"
                        ? "bg-gray-100 text-gray-600 border-gray-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        request.status === "accepted"
                          ? "bg-emerald-600"
                          : request.status === "rejected"
                          ? "bg-red-600"
                          : request.status === "expired"
                          ? "bg-gray-500"
                          : "bg-amber-500 animate-pulse"
                      }`}
                    />
                    {request.status}
                  </span>
                </div>

                {/* Requested Item vs Offered Item Grid */}
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6 relative">
                  {/* Central Floating Exchange Icon Badge (Desktop/Tablet) */}
                  <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-[#2E7D32] to-[#1E5621] text-white items-center justify-center shadow-lg border-2 border-white z-10 pointer-events-none">
                    <FaExchangeAlt className="text-sm" />
                  </div>

                  {/* Requested Product */}
                  <div className="bg-gray-50/70 border border-gray-100 rounded-2xl p-4 transition hover:bg-gray-50 flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white text-gray-700 border border-gray-200 mb-3 shadow-2xs">
                        Requested Product
                      </span>

                      {request.requestedProduct ? (
                        <>
                          <div className="w-full h-44 sm:h-52 rounded-xl overflow-hidden bg-white border border-gray-100">
                            <img
                              src={request.requestedProduct.image}
                              alt={request.requestedProduct.productName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 mt-3 truncate">
                            {request.requestedProduct.productName}
                          </h3>
                        </>
                      ) : (
                        <div className="w-full h-44 sm:h-52 rounded-xl border border-dashed border-gray-300 bg-gray-100/70 flex flex-col items-center justify-center text-center p-4">
                          <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xl mb-2 shadow-xs">
                            <FaTrashAlt />
                          </div>
                          <p className="text-xs font-bold text-gray-700">Product Removed</p>
                          <p className="text-[11px] text-gray-500 mt-0.5">Deleted by {request.receiver?.name || "owner"}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Offered Product */}
                  <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-4 transition hover:bg-emerald-50/70 flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/20 mb-3 shadow-2xs">
                        Your Offered Item
                      </span>

                      {request.offeredProduct ? (
                        <>
                          <div className="w-full h-44 sm:h-52 rounded-xl overflow-hidden bg-white border border-gray-100">
                            <img
                              src={request.offeredProduct.image}
                              alt={request.offeredProduct.productName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-[#2E7D32] mt-3 truncate">
                            {request.offeredProduct.productName}
                          </h3>
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
                </div>

                {/* Card Footer: Timestamp & Rating */}
                <div className="flex items-center justify-between flex-wrap gap-3 mt-5 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400">
                    <FaRegClock className="text-gray-400" />
                    <span>Last Updated: {new Date(request.updatedAt).toLocaleString()}</span>
                  </div>

                  {request.status === "accepted" && (
                    <div>
                      {request.userRating ? (
                        <div className="flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200/60 px-3 py-1 rounded-full text-xs font-bold shadow-2xs">
                          <span>You rated: {"⭐".repeat(Math.min(5, Math.max(0, Math.floor(Number(request.userRating) || 0))))}</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setReviewSwapId(request._id);
                            setShowReviewModal(true);
                          }}
                          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-2 px-4 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-xl hover:scale-105 active:scale-95 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>⭐ Rate Swap</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Review/Rating Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/80 overflow-hidden">
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-base">Rate & Review Swap</h3>
              <button
                onClick={() => {
                  setShowReviewModal(false);
                  setReviewText("");
                  setReviewRating(5);
                }}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-5">
              {/* Stars Selection */}
              <div className="text-center">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Select Rating
                </label>
                <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className={`hover:scale-115 active:scale-95 transition cursor-pointer text-2xl sm:text-3xl ${
                        star <= reviewRating ? "text-amber-400" : "text-gray-200"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  rows={3}
                  maxLength={100}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write a short review..."
                  className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl px-4 py-3 text-gray-800 text-sm font-semibold outline-none transition-all focus:bg-white focus:border-[#2E7D32] focus:ring-4 focus:ring-[#2E7D32]/10 resize-none"
                />
                <span className="text-[10px] text-gray-400 font-semibold block text-right mt-1">
                  {reviewText.length}/100 characters
                </span>
              </div>

              {/* Submit */}
              <button
                disabled={submittingReview}
                onClick={handleSubmitReview}
                className="w-full bg-gradient-to-r from-[#2E7D32] to-[#1E5621] hover:from-[#256728] hover:to-[#164219] text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-[#2E7D32]/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] disabled:opacity-70 transition-all duration-200 text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                {submittingReview ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Submit Review</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MySwapRequests;