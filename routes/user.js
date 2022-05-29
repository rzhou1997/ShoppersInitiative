const router = require('express').Router()
const userController = require('../controllers/userController')
const verifyToken = require('../middleware/verifyToken')

router.post('/register', userController.register)

router.post('/login', userController.login)

router.get('/logout', userController.logout)

router.get('/refresh_token', userController.refreshToken)

router.get('/infor', verifyToken,  userController.getUser)

router.patch('/addcart', verifyToken, userController.addCart)

router.get('/history', verifyToken, userController.history)


module.exports = router