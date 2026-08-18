const reviewModel = require("../model/reviewModel");
const swapModel = require("../model/swapModel");

// Submit a new rating and review
const createReview = async (req, res) => {
  try {
    const { swapRequestId, rating, reviewText } = req.body;

    if (!swapRequestId || !rating || !reviewText) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const ratingNum = Number(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    // Find the swap request
    const swap = await swapModel.findById(swapRequestId);
    if (!swap) {
      return res.status(404).json({ message: "Swap request not found" });
    }

    // Rating allowed only for accepted swaps
    if (swap.status !== "accepted") {
      return res.status(400).json({
        message: "Rating is only allowed for accepted swaps.",
      });
    }

    // Ensure the caller is either sender or receiver
    const isSender = swap.sender.toString() === req.user.id;
    const isReceiver = swap.receiver.toString() === req.user.id;

    if (!isSender && !isReceiver) {
      return res.status(403).json({
        message: "You are not authorized to rate this swap.",
      });
    }

    // The person being reviewed is the other party
    const reviewedUser = isSender ? swap.receiver : swap.sender;

    // Check if review already exists to prevent duplicates
    const existingReview = await reviewModel.findOne({
      reviewer: req.user.id,
      swapRequest: swapRequestId,
    });

    if (existingReview) {
      return res.status(400).json({
        message: "You have already reviewed this swap request.",
      });
    }

    const review = new reviewModel({
      reviewer: req.user.id,
      reviewedUser,
      swapRequest: swapRequestId,
      rating: ratingNum,
      reviewText: reviewText.trim(),
    });
    await review.save();

    return res.status(201).json({
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Retrieve reviews received by a user
const getUserReviews = async (req, res) => {
  try {
    const userId = req.params.id;
    const reviews = await reviewModel
      .find({ reviewedUser: userId })
      .populate("reviewer", "name profileImage")
      .sort({ createdAt: -1 });

    let avgRating = 0;
    if (reviews.length > 0) {
      const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
      avgRating = (sum / reviews.length).toFixed(1);
    }

    return res.status(200).json({
      reviews,
      avgRating: parseFloat(avgRating),
      reviewCount: reviews.length,
    });
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Check if review has been completed by current user for a swap
const checkReviewStatus = async (req, res) => {
  try {
    const { swapRequestId } = req.params;
    const review = await reviewModel.findOne({
      reviewer: req.user.id,
      swapRequest: swapRequestId,
    });

    return res.status(200).json({
      hasReviewed: !!review,
      rating: review ? review.rating : null,
    });
  } catch (error) {
    console.error("Error checking review status:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createReview,
  getUserReviews,
  checkReviewStatus,
};
