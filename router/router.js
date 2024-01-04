const express = require('express')
const UserController = require('../controllers/userController')
const ProductController = require('../controllers/productController')
const { errorHandler } = require('../middleware/errorHandler')
const CategoryController = require('../controllers/categoryController')
const PubController = require('../controllers/pubController')
const { authentication } = require('../middleware/authentication')
const { authorizationAdminOnly } = require('../middleware/authorizationForAdmin')
const { authorizationConditional } = require('../middleware/authorizationAdminStaff')
const router = express.Router()

//router user
router.post('/add-user', authentication, authorizationAdminOnly, UserController.addUser)
router.post('/login', UserController.login)

//router product
router.post('/products', ProductController.addProduct)
router.get('/products', ProductController.showProduct)
router.get('/products/:id', ProductController.showProductById)
router.put('/products/:id', authorizationConditional, ProductController.updateProductById)
router.delete('/products/:id', ProductController.deleteProductById)

//router category
router.post('/categories', CategoryController.addCategory)
router.get('/categories', CategoryController.showCategories)
router.put('/categories/:id', CategoryController.updateCategoryById)
router.delete('/categories/:id', CategoryController.deleteCategoryById)

//router public
router.get('/globalProducts/pub', PubController.showProducts)
router.get('/globalDetailProducts/pub/:id', PubController.detailProducts)

router.use(errorHandler)

module.exports = router