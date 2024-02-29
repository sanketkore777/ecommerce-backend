const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    orderItems: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orderItems"
    },
    orderDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    deliveryDate: {
        type: Date
    },
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address"
    },
    paymentDetails: {
        paymentMethod: {
            type: String
        },
        transactionid: {
            type: String
        },
        paymentId: {
            type: String,
        },
        paymentStatus: {
            type: String,
            required: true
        }

    },
    totalPrice: {
        type: Number,
        required: true
    },

    totalDiscountPrice: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        default: "Pending",

    },
    totalItem: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const orderModel = mongoose.model("order", orderSchema)
module.exports = orderModel