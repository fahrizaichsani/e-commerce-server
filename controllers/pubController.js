const { Product } = require('../models')
const { Category } = require('../models')
const { User } = require('../models')

class PubController {
    static async showProducts(req, res, next) {
        try {
            const allProducts = await Product.findAll()

            res.status(200).json(
                allProducts
            )
        } catch (error) {
            next(error)
        }
    }

    static async detailProducts(req, res, next) {
        try {
            const detailProduct = await Product.findByPk(req.params.id)

            if (!detailProduct) {
                throw { name: 'error not found' }
            }

            res.status(200).json(
                detailProduct
            )
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = PubController