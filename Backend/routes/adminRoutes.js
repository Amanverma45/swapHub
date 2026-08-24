const express = require("express");
const adminController = require("../controller/adminController");
const adminMiddleware = require("../adminMiddleware");

const router = express.Router();

router.get("/admin/stats", adminMiddleware, adminController.getAdminStats);
router.get("/admin/reports", adminMiddleware, adminController.getReports);
router.put("/admin/reports/:id/status", adminMiddleware, adminController.updateReportStatus);

router.get("/admin/users", adminMiddleware, adminController.getUsers);
router.delete("/admin/users/:id", adminMiddleware, adminController.deleteUser);

router.get("/admin/products", adminMiddleware, adminController.getProducts);
router.delete("/admin/products/:id", adminMiddleware, adminController.deleteProduct);

module.exports = router;
