const jwtProvider = require('../config/jwtProvider')
const userService = require('../services/user.service')
const authenticate = async (req, res, next) => {
    try {
        const token = req.headers?.authorization
        console.log(token, 'sanketkoresankekore')
        if (!token) {
            return res.status(404).send({ error: "token not found..." })
        }
        const userId = jwtProvider.getUserIdFromToken(token);
        const user = userService.getUserById(userId)
        req.user = user
    } catch (error) {
        console.log(error)
        return res.status(501).send({ error: error.message })
    }
    next()
}

module.exports = authenticate;