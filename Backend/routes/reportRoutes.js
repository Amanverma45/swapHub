const express = require("express");
const reportController = require("../controller/reportController");
const authMiddleware = require("../authMiddleware");

const router = express.Router();

router.post("/reportProduct", authMiddleware, reportController.createReport);
router.get("/getUserReportedProductIds", authMiddleware, reportController.getUserReportedProductIds);

module.exports = router;
