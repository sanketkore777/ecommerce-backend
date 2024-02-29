const express = require('express');
const router = express.Router();

const cartController = require('../controller/cart.controller');
const authenticate = require('../middleware/authenticate');

router.get('/', authenticate, cartController.findUserCart);
router.post('/add', authenticate, cartController.addItemToCart)
router.delete('/remove', authenticate, cartController.removeItemFromCart)

module.exports = router