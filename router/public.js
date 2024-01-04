const PubController = require('../controllers/pubController')
const { authentication } = require('../middleware/authentication')
const { authorizationAdminOnly } = require('../middleware/authorizationForAdmin')
const { authorizationConditional } = require('../middleware/authorizationAdminStaff')
const router = express.Router()

router.get('/pub', PubController.showProducts)
router.get('/pub/:id', PubController.detailProducts)

module.exports = router