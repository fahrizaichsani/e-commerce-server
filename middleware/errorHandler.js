const errorHandler = (error, req, res, next) => {
    switch (error.name) {
        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            res.status(400).json({ message: error.errors[0].message })
            break;
        case 'error not found':
            res.status(404).json({ message: 'not found' })
        default:
            res.status(500).json({ message: 'Internal Server Error' })
            break;
    }
}

module.exports = { errorHandler }