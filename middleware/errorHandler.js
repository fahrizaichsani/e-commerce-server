const errorHandler = (error, req, res, next) => {
    switch (error.name) {
        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            res.status(400).json({ message: error.errors[0].message })
            break;
        case 'error not found':
            res.status(404).json({ message: 'not found' })
            break;
        case 'cant login':
            res.status(401).json({ message: 'Invalid email and password' })
            break;
        case 'Email cannot empty':
            res.status(400).json({ message: 'Email cannot empty' })
        case 'Password cannot empty':
            res.status(400).json({ message: 'Password cannot empty' })
        default:
            res.status(500).json({ message: 'Internal Server Error' })
            break;
    }
}

module.exports = { errorHandler }