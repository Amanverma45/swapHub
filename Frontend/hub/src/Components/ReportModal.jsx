import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFlag, FaTimes, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";

const REPORT_REASONS = [
  { id: "scam", label: "Scam / Fraud", icon: "🚫" },
  { id: "wrong_info", label: "Wrong information", icon: "❌" },
  { id: "fake_image", label: "Fake/irrelevant image", icon: "📷" },
  { id: "inappropriate", label: "Inappropriate content", icon: "⚠️" },
  { id: "other", label: "Other", icon: "📝" },
];

const ReportModal = ({ product, isOpen, onClose, onReportSuccess }) => {
  const [selectedReason, setSelectedReason] = useState(REPORT_REASONS[0].label);
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !product) return null;

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to report a product");
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post("/reportProduct", {
        productId: product._id,
        reason: selectedReason,
        additionalDetails,
      });

      toast.success(response.data.message || "Report submitted successfully.");
      if (onReportSuccess) {
        onReportSuccess(product._id);
      }
      onClose();
    } catch (error) {
      console.error("Report error:", error);
      const errMsg = error.response?.data?.message || "Failed to submit report";
      toast.error(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-7 overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <FaTimes className="text-base" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center text-lg shrink-0 border border-red-100">
              <FaFlag />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-gray-900 leading-tight">
                Report Product
              </h2>
              <p className="text-xs font-medium text-gray-500 line-clamp-1">
                {product.productName}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmitReport} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Select Reason:
              </label>
              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {REPORT_REASONS.map((r) => {
                  const isSelected = selectedReason === r.label;
                  return (
                    <div
                      key={r.id}
                      onClick={() => setSelectedReason(r.label)}
                      className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-red-50/70 border-red-500 text-red-700 font-bold shadow-xs"
                          : "bg-gray-50/60 border-gray-200/80 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 text-xs sm:text-sm">
                        <span className="text-base">{r.icon}</span>
                        <span>{r.label}</span>
                      </div>
                      {isSelected && <FaCheckCircle className="text-red-500 text-sm" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Additional details text field */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Additional Details (Optional):
              </label>
              <textarea
                rows="3"
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                placeholder="Provide extra details to help our moderation team..."
                className="w-full p-3 rounded-2xl border border-gray-200 text-xs sm:text-sm text-gray-800 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-2xl border border-gray-200 font-bold text-xs sm:text-sm text-gray-600 hover:bg-gray-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 py-3 px-4 rounded-2xl bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-500/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <FaFlag className="text-xs" />
                    <span>Submit Report</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ReportModal;
