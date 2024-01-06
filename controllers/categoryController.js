const { Category } = require('../models')
class CategoryController {
    static async addCategory(req, res, next) {
        try {
            const category = await Category.create(req.body)
            res.status(201).json({
                id: category.id,
                name: category.name,
                updatedAt: category.updatedAt,
                createdAt: category.createdAt
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
                id: afterUpdateCategory.id,
                name: afterUpdateCategory.name,
                createdAt: afterUpdateCategory.createdAt,
                updatedAt: afterUpdateCategory.updatedAt
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
                message: `${beforeDeleteCategory.name} success to delete`
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = CategoryController