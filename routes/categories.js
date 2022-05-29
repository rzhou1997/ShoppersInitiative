const router = require('express').Router()
const categoryController = require('../controllers/categoryController')
const verifyToken = require('../middleware/verifyToken')
const verifyTokenAdmin = require('../middleware/verifyTokenAdmin')

router.get('/getcategories',categoryController.getCategories);
router.post('/createcategory',verifyToken, verifyTokenAdmin, categoryController.createCategory);
router.delete('/deletecategory/:id',verifyToken, verifyTokenAdmin, categoryController.deleteCategory);
router.put('/updatecategory/:id',verifyToken, verifyTokenAdmin, categoryController.updateCategory);


module.exports = router