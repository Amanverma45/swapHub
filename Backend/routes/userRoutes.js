const userController = require('../controller/userController.js')
const express = require('express')

const router= express.Router()

router.post('/saveUser',userController.saveUser)
router.post('/loginUser',userController.loginUser)

module.exports = router