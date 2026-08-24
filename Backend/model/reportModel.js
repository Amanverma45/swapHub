const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    additionalDetails: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Pending", "Resolved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("report", reportSchema);
