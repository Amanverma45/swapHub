const mongoose = require("mongoose");

const swapSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    requestedProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },

    offeredProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("swap", swapSchema);