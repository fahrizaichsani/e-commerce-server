const authorizationAdminOnly = async (req, res, next) => {
    try {
        if (req.user.role === 'Admin') {
            next()
        } else {
            throw {name: 'Forbidden'}
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = { authorizationAdminOnly }