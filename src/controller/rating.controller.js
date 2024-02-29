const ratingService = require('../services/rating.service')
const userService = require('../services/user.service')
const createRating = async (req, res) => {
    const jwt = req.headers.authorization.split(' ')[1]
    const user = await userService.getUserProfileByToken(jwt);
    try {
        const rating = await ratingService.createRating(req.body, user)
        return res.status(201).send(rating)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const getAllRatings = async (req, res) => {
    const productId = req.params.productId;
    const user = req.user
    try {
        const reviews = await ratingService.getProductRating(productId)
        return res.status(201).send(reviews)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

module.exports = { getAllRatings, createRating }