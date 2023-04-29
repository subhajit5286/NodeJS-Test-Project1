const express = require('express');

const orderController = require('../controllers/order');

const router = express.Router();

router.post('/order/add-order', orderController.addOrder);

router.get('/order/get-order', orderController.getOrder);

router.delete('/order/delete-order/:id', orderController.deleteOrder);


module.exports = router;