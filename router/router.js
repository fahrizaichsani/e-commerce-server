const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()

//router user
router.post('/register', userController.register)
router.post('/login')

//router global

module.exports = router