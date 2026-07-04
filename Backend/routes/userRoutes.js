const userController = require('../controller/userController.js')
const authMiddleware = require('../authMiddleware.js')
const upload = require('../middleware/upload.js');
const express = require('express')

const router= express.Router()

router.post('/saveUser',userController.saveUser)
router.post('/loginUser',userController.loginUser)
router.put("/updateProfile",authMiddleware,upload.single("profileImage"),userController.updateProfile);

module.exports = router