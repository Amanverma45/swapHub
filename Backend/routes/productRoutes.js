const productController = require('../controller/productController.js')
const authMiddleware = require('../authMiddleware.js')
const express = require('express')
const upload = require('../middleware/upload.js')

const router = express.Router()
router.post('/addProduct',authMiddleware,upload.single('image'),productController.addProduct)
router.get('/getProduct',productController.getProduct)
router.get("/getProduct/:id", productController.getSingleProduct);
router.get("/myProducts",authMiddleware,productController.getMyProducts);
router.delete('/deleteProduct/:id',authMiddleware,productController.deleteProduct)
router.put("/updateProduct/:id",authMiddleware,upload.single("image"),productController.updateProduct);
module.exports = router