const express = require('express')
const CategoryController = require('../controllers/categoryController')
const { authorizationConditional } = require('../middleware/authorizationAdminStaff')
const router = express.Router()

router.post('/', CategoryController.addCategory)
router.get('/', CategoryController.showCategories)
router.put('/:id', CategoryController.updateCategoryById)
router.delete('/:id', CategoryController.deleteCategoryById)

module.exports = router