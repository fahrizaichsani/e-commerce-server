const { Category } = require('../models')
class CategoryController {
    static async addCategory(req, res, next) {
        try {
            const category = await Category.create(req.body)
            res.status(201).json({
                message: 'Add Category Success',
                category
            })
        } catch (error) {
            next(error)
        }
    }

    static async showCategories(req, res, next) {
        try {
            const allCategory = await Category.findAll()

            res.status(200).json(
                allCategory
            )
        } catch (error) {
            next(error)
        }
    }

    static async updateCategoryById(req, res, next) {
        try {
            await Category.update(req.body, {
                where: {
                    id: req.params.id
                }
            })

            const afterUpdateCategory = await Category.findByPk(req.params.id)

            if (!afterUpdateCategory) {
                throw { name: 'error not found' }
            }

            res.status(200).json({
                message: 'Update Success',
                data: afterUpdateCategory
            })
        } catch (error) {
            next(error)
        }
    }

    static async deleteCategoryById(req, res, next) {
        try {
            const beforeDeleteCategory = await Category.findByPk(req.params.id)

            if (!beforeDeleteCategory) {
                throw { name: 'error not found' }
            }

            await Category.destroy({
                where: {
                    id: req.params.id
                }
            })

            res.status(200).json({
                data: beforeDeleteCategory,
                message: `${beforeDeleteCategory.name} success to delete`
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = CategoryController