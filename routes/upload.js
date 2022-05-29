const router = require('express').Router()
const verifyToken = require('../middleware/verifyToken')
const verifyTokenAdmin = require('../middleware/verifyTokenAdmin')
const uploadController = require('../controllers/UploadController')

router.post('/newitem',verifyToken , verifyTokenAdmin, uploadController.uploadData)
router.post('/deleteitem',verifyToken , verifyTokenAdmin, uploadController.deleteData)
module.exports = router