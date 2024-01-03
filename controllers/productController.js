const { Product } = require('../models')
const { Category } = require('../models')
const { User } = require('../models')
class ProductController {
    static async addProduct(req, res, next) {
        try {
            const product = await Product.create(req.body)
            res.status(201).json({
                message: 'Add Product Success',
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                imgUrl: product.imgUrl,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt
            })
        } catch (error) {
            next(error)
        }
    }

    static async showProduct(req, res, next) {
        try {
            const allProducts = await Product.findAll({
                include: [{ model: Category }, { model: User, attributes: { exclude: ['password'] } }]
            })

            res.status(200).json(
                allProducts
            )
        } catch (error) {
            next(error)
        }
    }

    static async showProductById(req, res, next) {
        try {
            const productById = await Product.findByPk(req.params.id)

            if (!productById) {
                throw { name: 'error not found' }
            }

            res.status(200).json(
                productById
            )
        } catch (error) {
            next(error)
        }
    }

    static async updateProductByid(req, res, next) {
        try {
            const updateProduct = await Product.update(req.body, {
                where: {
                    id: req.params.id
                }
            })

            const afterUpdateProduct = await Product.findByPk(req.params.id)

            if (!afterUpdateProduct) {
                throw { name: 'error not found' }
            }

            res.status(200).json({
                message: 'Update Success',
                data: afterUpdateProduct
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductController
