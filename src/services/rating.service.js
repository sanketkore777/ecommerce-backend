const Rating = require('../Models/rating.model')
const productService = require('../services/product.service')

async function createRating(req, user) {
    const product = await productService.findProductById(req.productId);
    console.log(user)
    const rating = new Rating({
        product: product._id,
        user: user._id,
        rating: req.rating,
        createdAt: new Date()
    })
    return await rating.save();
}

async function getProductRating(productId) {
    return await Rating.find({ product: productId })
}

module.exports = { getProductRating, createRating }