const cartItemService = require('../services/cartItem.service')
const userService = require('../services/user.service')

const updateCartItem = async (req, res) => {
    const jwt = req.headers.authorization.split('')[1]
    const user = userService.getUserProfileByToken(jwt)
    try {
        const updatedCartItem = await cartItemService.updateCartItem(user._id, req.body)
        return res.status(200).send(updatedCartItem)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const removeCartItem = async (req, res) => {
    const jwt = req.headers.authorization.split(' ')[1]
    const user = await userService.getUserProfileByToken(jwt);
    try {
        const updatedCartItem = await cartItemService.removeCartItem(user._id, req.params.id)
        return res.status(200).send({ message: "removed cart item", product: updateCartItem })
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

module.exports = { updateCartItem, removeCartItem }