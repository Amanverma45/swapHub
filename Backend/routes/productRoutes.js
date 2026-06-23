const productController = require('../controller/productController.js')
const authMiddleware = require('../authMiddleware.js')
const express = require('express')

const router = express.Router()
router.post('/addProduct',authMiddleware,productController.addProduct)
router.get('/getProduct',productController.getProduct)
router.delete('/deleteProduct/:id',productController.deleteProduct)
router.put('/updateProduct/:id',productController.updateProduct)

module.exports = router    