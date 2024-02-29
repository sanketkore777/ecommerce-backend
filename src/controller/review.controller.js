const reviewService = require('../services/review.service')
const userService = require('../services/user.service')
const createReview = async (req, res) => {
    const jwt = req.headers.authorization.split(' ')[1]
    const user = await userService.getUserProfileByToken(jwt);
    try {
        const review = await reviewService.createReview(req.body, user)
        return res.status(201).send(review)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const getAllReview = async (req, res) => {
    const productId = req.params.productId;
    try {
        const reviews = await reviewService.getAllreviews(productId)
        return res.status(201).send(reviews)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

module.exports = { getAllReview, createReview }