
const authorizationConditional = async (req, res, next) => {
    try {
        if (req.user.role === 'Admin') {
            next()
        } else if (req.user.role === 'Staff' && req.user.id === ) {
            next()
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = { authorizationConditional }