const userService = require('../services/user.service')
const CartItem = require('../Models/cartItem.model')

const updateCartItem = async (userId, cartItemId, cartItemData) => {
    try {
        const item = await findCartItemById(cartItemId)
        const user = await userService.getUserById(item.userId)
        if (!item) {
            throw new Error("cart item not found")
        }
        if (!user) {
            throw new Error("user not found")
        }
        if (item.userId == userId) {
            item.quantity = cartItemData.quantity
            item.price = item.quantity * item.product.price
            item.discountedPrice = item.quantity * item.product.discountedPrice
            const updatedCartItem = await item.save()
            return updatedCartItem;
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

const removeCartItem = async (userId, cartItemId) => {
    const cartItem = await findCartItemById(cartItemId)
    const user = await userService.getUserById(userId)
    console.log(user._id, " ", cartItem.userId)
    if (user._id.toString() === cartItem.userId.toString()) {
        await CartItem.findByIdAndDelete(cartItemId)
    } else {
        throw new Error("Can't remove someone else's product")
    }
}

const findCartItemById = async (cartItemId) => {
    const cartItem = await CartItem.findById(cartItemId)
    console.log("----------" + cartItemId)
    if (cartItem) {
        return cartItem;
    } else {
        throw new Error('Cant not find cart item')
    }
}

module.exports = { updateCartItem, removeCartItem, findCartItemById }