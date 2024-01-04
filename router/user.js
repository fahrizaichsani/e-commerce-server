const UserController = require('../controllers/userController')
const { authentication } = require('../middleware/authentication')
const { authorizationAdminOnly } = require('../middleware/authorizationForAdmin')
const { authorizationConditional } = require('../middleware/authorizationAdminStaff')
const router = express.Router()

router.post('/add-user', authentication, authorizationAdminOnly, UserController.addUser)
router.post('/login', UserController.login)

module.exports = router