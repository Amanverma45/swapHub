const userModel = require("../model/userModel");
const productModel = require("../model/productModel");
const swapModel = require("../model/swapModel");
const reportModel = require("../model/reportModel");

const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();
    const totalProducts = await productModel.countDocuments();
    const totalSwaps = await swapModel.countDocuments();
    const totalReports = await reportModel.countDocuments();
    const pendingReports = await reportModel.countDocuments({ status: "Pending" });

    return res.status(200).json({
      totalUsers,
      totalProducts,
      totalSwaps,
      totalReports,
      pendingReports,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getReports = async (req, res) => {
  try {
    const reports = await reportModel
      .find()
      .populate("reporter", "name email profileImage")
      .populate({
        path: "product",
        populate: {
          path: "owner",
          select: "name email profileImage",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json(reports);
  } catch (error) {
    console.error("Admin fetch reports error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const updateReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, deleteProduct } = req.body;

    const report = await reportModel.findById(id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    if (status) {
      report.status = status;
      await report.save();
    }

    // Optional: Delete product if admin chooses to resolve and remove product
    if (deleteProduct && report.product) {
      const productId = report.product;
      await productModel.findByIdAndDelete(productId);
      await userModel.updateMany(
        { wishlist: productId },
        { $pull: { wishlist: productId } }
      );
    }

    return res.status(200).json({
      message: `Report updated to ${status}${deleteProduct ? " & product deleted" : ""}`,
      report,
    });
  } catch (error) {
    console.error("Admin update report status error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password").sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (error) {
    console.error("Admin fetch users error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id);
    // Delete user's products as well
    await productModel.deleteMany({ owner: id });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Admin delete user error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await productModel
      .find()
      .populate("owner", "name email profileImage")
      .sort({ createdAt: -1 });
    return res.status(200).json(products);
  } catch (error) {
    console.error("Admin fetch products error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.findByIdAndDelete(id);
    await userModel.updateMany(
      { wishlist: id },
      { $pull: { wishlist: id } }
    );
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Admin delete product error:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAdminStats,
  getReports,
  updateReportStatus,
  getUsers,
  deleteUser,
  getProducts,
  deleteProduct,
};
