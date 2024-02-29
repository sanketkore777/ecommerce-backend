const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories"
    },
    lavel: {
        type: Number,
        required: true
    }
})

const categoryModel = mongoose.model("categories", categorySchema)
module.exports = categoryModel