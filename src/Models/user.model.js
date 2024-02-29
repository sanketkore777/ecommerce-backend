const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Customer"
    },
    mobile: {
        type: String,
    },
    addresses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "address"
    }],
    paymentInfo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "paymentInformation"
    }],
    ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ratings"
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviews"
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const userModel = mongoose.model('user', userSchema)
module.exports = userModel;