const userController = require('../controller/userController.js')
const authMiddleware = require('../authMiddleware.js')
const upload = require('../middleware/upload.js');
const express = require('express')

const router= express.Router()

router.post('/saveUser',userController.saveUser)
router.post('/loginUser',userController.loginUser)
router.post('/googleLogin',userController.googleLogin)
router.post('/sendRegistrationOtp', userController.sendRegistrationOtp)
router.put("/updateProfile",authMiddleware,upload.single("profileImage"),userController.updateProfile);
router.get("/getProfile", authMiddleware, userController.getProfile);
router.put("/removeProfilePhoto", authMiddleware, userController.removeProfilePhoto);
// Wishlist Routes
router.post("/toggleWishlist/:productId", authMiddleware, userController.toggleWishlist);
router.get("/getWishlist", authMiddleware, userController.getWishlist);
router.get("/getWishlistIds", authMiddleware, userController.getWishlistIds);

module.exports = router