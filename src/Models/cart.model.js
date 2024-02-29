const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: "please enter the user"
    },
    cartItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "cartItem"
    }],
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    totalItem: {
        type: Number,
        required: true,
        default: 0
    },
    totalDiscount: {
        type: Number,
        required: true,
        default: 0
    },
    discount: {
        type: Number,
        required: true,
        default: 0
    }

})

const cartModel = mongoose.model("cart", cartSchema)
module.exports = cartModel