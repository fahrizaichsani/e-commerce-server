const express = require('express')
const UserController = require('../controllers/userController')
const ProductController = require('../controllers/productController')
const { errorHandler } = require('../middleware/errorHandler')
const CategoryController = require('../controllers/categoryController')
const PubController = require('../controllers/pubController')
const router = express.Router()

//router user
router.post('/register', UserController.register)
router.post('/login')

//router product
router.post('/products', ProductController.addProduct)
router.get('/products', ProductController.showProduct)
router.get('/products/:id', ProductController.showProductById)
router.put('/products/:id', ProductController.updateProductById)
router.delete('/products/:id', ProductController.deleteProductById)

//router category
router.post('/categories', CategoryController.addCategory)
router.get('/categories', CategoryController.showCategories)
router.put('/categories/:id', CategoryController.updateCategoryById)
router.delete('/categories/:id', CategoryController.deleteCategoryById)

//router public
router.get('/globalProducts/pub', PubController.showProducts)
router.get('/globalDetailProducts/pub', PubController.detailProducts)

router.use(errorHandler)

module.exports = router