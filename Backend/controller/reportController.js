const reportModel = require("../model/reportModel");
const productModel = require("../model/productModel");

const createReport = async (req, res) => {
  try {
    const { productId, reason, additionalDetails } = req.body;
    const reporterId = req.user.id;

    if (!productId || !reason) {
      return res.status(400).json({
        message: "Product ID and reason are required",
      });
    }

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Check if user has already reported this product
    const existingReport = await reportModel.findOne({
      reporter: reporterId,
      product: productId,
    });

    if (existingReport) {
      return res.status(400).json({
        message: "You have already reported this product.",
      });
    }

    const newReport = await reportModel.create({
      reporter: reporterId,
      product: productId,
      reason,
      additionalDetails: additionalDetails || "",
    });

    return res.status(201).json({
      message: "Report submitted successfully.",
      report: newReport,
    });
  } catch (error) {
    console.error("Error creating report:", error);
    return res.status(500).json({
      message: error.message || "Failed to submit report",
    });
  }
};

const getUserReportedProductIds = async (req, res) => {
  try {
    const reporterId = req.user.id;
    const reports = await reportModel.find({ reporter: reporterId }).select("product");
    const reportedProductIds = reports.map((r) => r.product.toString());
    return res.status(200).json(reportedProductIds);
  } catch (error) {
    console.error("Error fetching reported product IDs:", error);
    return res.status(500).json({
      message: error.message || "Failed to fetch reports",
    });
  }
};

module.exports = {
  createReport,
  getUserReportedProductIds,
};
