const { Product } = require('../models')
const { Category } = require('../models')
const { User } = require('../models')
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

class ProductController {
    static async addProduct(req, res, next) {
        try {
            req.body.authorId = req.user.id
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

    static async updateProductById(req, res, next) {
        try {
            await Product.update(req.body, {
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

    static async deleteProductById(req, res, next) {
        try {
            const beforeDeleteProduct = await Product.findByPk(req.params.id)

            if (!beforeDeleteProduct) {
                throw { name: 'error not found' }
            }

            await Product.destroy({
                where: {
                    id: req.params.id
                }
            })

            res.status(200).json({
                data: beforeDeleteProduct,
                message: 'Delete Success'
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async updateImageUrlById(req, res, next) {
        try {
            const product = await Product.findByPk(req.params.id)
            if (!product) {
                throw { name: 'not found' }
            }

            if (!req.file) {
                throw { name: 'Please upload an image' }
            }

            const base64Image = Buffer.from(req.file.buffer).toString('base64')
            const base64Url = `data:${req.file.mimetype};base64,${base64Image}`

            const result = await cloudinary.uploader.upload(base64Url, {
                public_id: `${req.file.originalname}`,
                folder: 'hck66'
            })

            await Product.update({
                imgUrl: result.secure_url
            }, {
                where: { id: req.params.id }
            })

            res.status(200).json({
                message: `Image ${product.imgUrl} success to update`
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = ProductController
