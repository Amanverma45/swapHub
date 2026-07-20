const userController = require('../controller/userController.js')
const authMiddleware = require('../authMiddleware.js')
const upload = require('../middleware/upload.js');
const express = require('express')

const router= express.Router()

router.post('/saveUser',userController.saveUser)
router.post('/loginUser',userController.loginUser)
router.put("/updateProfile",authMiddleware,upload.single("profileImage"),userController.updateProfile);
router.get("/getProfile", authMiddleware, userController.getProfile);
router.put("/removeProfilePhoto", authMiddleware, userController.removeProfilePhoto);
router.post("/forgotPassword", userController.forgotPassword);
// NAYA CHANGE: Password Reset URL se aane wali request ko handle karne ke liye route
router.post("/resetPassword", userController.resetPassword);
module.exports = router