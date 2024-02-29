const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountedPrice: {
        type: Number,
        required: true
    },
    discountPercent: {
        type: Number,
    },
    quantity: {
        type: Number,
        required: true
    },
    brand: {
        type: String,

    },
    color: {
        type: String
    },
    sizes: [{
        name: { type: String },
        quantity: { type: Number }
    }],
    imageUrl: {
        type: String,
    },

    ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "rating"
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "review"
    }],
    numRatings: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const productModel = mongoose.model("product", productSchema)
module.exports = productModel