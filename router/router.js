const express = require('express')
const { errorHandler } = require('../middleware/errorHandler')
const { authentication } = require('../middleware/authentication')
const { authorizationAdminOnly } = require('../middleware/authorizationForAdmin')
const { authorizationConditional } = require('../middleware/authorizationAdminStaff')
const router = express.Router()

router.use('/categories', require('./category'))
router.use('/publics', require('./public'))
router.use('/products', require('./category'))
router.use('/users', require('./user'))
router.use(errorHandler)

module.exports = router