const { Product } = require('../models')

const authorizationConditional = async (req, res, next) => {
    try {
        const findPost = await Product.findByPk(req.params.id)
        if (req.user.role === 'Admin') {
            next()
        } else if (req.user.role === 'Staff' && req.user.id === findPost.authorId) {
            next()
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = { authorizationConditional }