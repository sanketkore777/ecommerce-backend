const mongoose = require("mongoose")

const reviewSchema = mongoose.Schema({
    review: {
        type: String,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const reviewModel = mongoose.model('review', reviewSchema)
module.exports = reviewModel