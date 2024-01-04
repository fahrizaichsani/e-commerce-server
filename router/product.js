const ProductController = require('../controllers/productController')
const { authentication } = require('../middleware/authentication')
const { authorizationAdminOnly } = require('../middleware/authorizationForAdmin')
const { authorizationConditional } = require('../middleware/authorizationAdminStaff')
const router = express.Router()

router.post('/', ProductController.addProduct)
router.get('/', ProductController.showProduct)
router.get('/:id', ProductController.showProductById)
router.put('/:id', authorizationConditional, ProductController.updateProductById)
router.delete('/:id', ProductController.deleteProductById)

module.exports = router