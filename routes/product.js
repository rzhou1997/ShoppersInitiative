const router = require('express').Router()
const productController = require('../controllers/productController')
const verifyToken = require('../middleware/verifyToken')
const verifyTokenAdmin = require('../middleware/verifyTokenAdmin')


/**router.route('/products')
    .get(productController.getProducts)
    .post(verifyToken, verifyTokenAdmin, productController.createProduct)


router.route('/products/:id')
    .delete(verifyToken, verifyTokenAdmin, productController.deleteProduct)
    .put(verifyToken, verifyTokenAdmin, productController.updateProduct)**/

    router.get('/allproducts', productController.getProducts);
    router.post('/createproduct',verifyToken, verifyTokenAdmin, productController.createProduct);
    router.delete('/deleteproduct/:id',verifyToken, verifyTokenAdmin, productController.deleteProduct);
    router.put('/updateproduct/:id',verifyToken, verifyTokenAdmin, productController.updateProduct);



module.exports = router