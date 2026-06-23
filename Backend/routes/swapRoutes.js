
const swapController = require('../controller/swapController.js')
const express = require('express')

const router = express.Router()
router.post('/swapProduct',swapController.swapProduct)
router.get('/getSwapRequest',swapController.getSwapRequest)
router.put('/acceptSwapRequest/:id',swapController.acceptSwapRequest)
router.put('/rejectSwapRequest/:id',swapController.rejectSwapRequest)

module.exports = router