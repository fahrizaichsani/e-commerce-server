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
        case 'Forbidden':
            res.status(403).json({ message: 'Forbidden' })
            break;
        case 'Email cannot empty':
            res.status(400).json({ message: 'Email cannot empty' })
            break;
        case 'Password cannot empty':
            res.status(400).json({ message: 'Password cannot empty' })
            break;
        case 'Unathorized':
            res.status(401).json({ message: 'Unathorized' })
            break;
        case 'Please upload an image':
            res.status(400).json({ message: 'Please upload an image' })
            break;
        default:
            res.status(500).json({ message: 'Internal Server Error' })
            break;
    }
}

module.exports = { errorHandler }