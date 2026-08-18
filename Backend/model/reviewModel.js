const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    reviewedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    swapRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "swap",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    reviewText: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure a user can only review the other party once per swap request
reviewSchema.index({ reviewer: 1, swapRequest: 1 }, { unique: true });

module.exports = mongoose.model("review", reviewSchema);
