
const swapController = require('../controller/swapController.js')
const express = require('express')
const authMiddleware = require('../authMiddleware.js')

const router = express.Router()
router.post('/swapProduct',authMiddleware,swapController.swapProduct)
router.get('/getSwapRequest',authMiddleware,swapController.getSwapRequest)
router.put('/acceptSwapRequest/:id',authMiddleware,swapController.acceptSwapRequest)
router.put('/rejectSwapRequest/:id',authMiddleware,swapController.rejectSwapRequest)
router.get("/mySwapRequests",authMiddleware,swapController.mySwapRequests);
router.get("/notificationCount",authMiddleware,swapController.notificationCount);

module.exports = router