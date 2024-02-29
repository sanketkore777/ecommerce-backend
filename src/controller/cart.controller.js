const cartService = require('../services/cart.service')
const userService = require('../services/user.service')

const findUserCart = async (req, res) => {
    const jwt = req.headers.authorization
    console.log(jwt)
    let user;
    try {
        user = await userService.getUserProfileByToken(jwt);
        const cart = await cartService.getUserCart(user._id)
        return res.status(200).send(cart)
    } catch (error) {
        return res.status(500).send({ errors: error.message })
    }
}

const addItemToCart = async (req, res) => {
    const jwt = req.headers.authorization
    const user = await userService.getUserProfileByToken(jwt)
    console.log(user + "///////////////////")
    try {
        const cartItem = await cartService.addCartItem(user._id, req.body)
        return res.status(200).send(cartItem)
    } catch (error) {
        console.log(error, 'sanketkore')
        return res.status(500).send({ error: error.message })
    }
}

const removeItemFromCart = async (req, res) => {
    const jwt = req.headers.authorization
    const user = await userService.getUserProfileByToken(jwt)
    try {
        const cartItem = await cartService.removeCartItem(user._id, req.body)
        return res.status(202).send(cartItem)
    } catch (error) {
        console.log(error, 'sanketkore')
        return res.status(508).send({ error: error.message })
    }
}

module.exports = { findUserCart, addItemToCart, removeItemFromCart }