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
         
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = PubController