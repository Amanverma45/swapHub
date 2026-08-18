const express = require("express");
const router = express.Router();
const reviewController = require("../controller/reviewController.js");
const authMiddleware = require("../authMiddleware.js");

router.post("/reviews", authMiddleware, reviewController.createReview);
router.get("/reviews/user/:id", reviewController.getUserReviews);
router.get("/reviews/check/:swapRequestId", authMiddleware, reviewController.checkReviewStatus);

module.exports = router;
