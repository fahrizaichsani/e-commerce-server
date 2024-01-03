const express = require('express')
const UserController = require('../controllers/userController')
const ProductController = require('../controllers/productController')
const { errorHandler } = require('../middleware/errorHandler')
const router = express.Router()

//router user
router.post('/register', UserController.register)
router.post('/login')

//router product
router.post('/products', ProductController.addProduct)
router.get('/products', ProductController.showProduct)
router.get('/products/:id', ProductController.showProductById)
router.put('/products/:id', ProductController.updateProductByid)


router.use(errorHandler)

module.exports = router