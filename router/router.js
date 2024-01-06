const express = require('express')
const { errorHandler } = require('../middleware/errorHandler')
const { authentication } = require('../middleware/authentication')
const { authorizationAdminOnly } = require('../middleware/authorizationForAdmin')
const UserController = require('../controllers/userController')
const PubController = require('../controllers/pubController')
const router = express.Router()

router.use('/publics', require('./public'))
router.post('/login', UserController.login)

router.use(authentication)

router.post('/add-user', authorizationAdminOnly, UserController.addUser)
router.use('/categories', require('./category'))
router.use('/products', require('./product'))

router.use(errorHandler)

module.exports = router