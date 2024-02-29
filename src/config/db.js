const mongoose = require("mongoose")
async function connection(params) {
    return await mongoose.connect("mongodb+srv://sanketkore960:Ecommerce_App@cluster0.5hvewuv.mongodb.net/?retryWrites=true&w=majority").then((res) => console.log("connected"))
}

module.exports = connection