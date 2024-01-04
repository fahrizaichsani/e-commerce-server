const express = require('express')
const ProductController = require('../controllers/productController')
const { authorizationConditional } = require('../middleware/authorizationAdminStaff')
const router = express.Router()

router.post('/', ProductController.addProduct)
router.get('/', ProductController.showProduct)
router.get('/:id', ProductController.showProductById)
router.put('/:id', authorizationConditional, ProductController.updateProductById)
router.delete('/:id', authorizationConditional, ProductController.deleteProductById)

module.exports = router