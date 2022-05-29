const router = require('express').Router()
const paymentController = require('../controllers/paymentController')
const verifyToken = require('../middleware/verifyToken')
const verifyTokenAdmin = require('../middleware/verifyTokenAdmin')

router.get("/getpayments",verifyToken,verifyTokenAdmin, paymentController.getPayments)
router.post("/createpayment",verifyToken, paymentController.createPayment)
    

module.exports = router
