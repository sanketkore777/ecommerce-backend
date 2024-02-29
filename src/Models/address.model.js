const mongoose = require('mongoose')

const addressesSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        requried: true
    },
    streetAddress: {
        type: String,
        requied: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    mobile: {
        type: String,
        required: true
    }
})

const addressModel = mongoose.model('address', addressesSchema)

module.exports = addressModel