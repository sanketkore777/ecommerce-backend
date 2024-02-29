const userService = require('../services/user.service')

const getUserProfile = async (req, res) => {
    try {
        console.log("hello----")
        const jwt = req.headers.authorization.split(' ')[1] //getting token..
        console.log("JWT----------:" + jwt)
        if (!jwt) {
            return res.status(404).send({ error: "token not found" })
        }
        const user = await userService.getUserProfileByToken(jwt)
        return res.status(200).send(user)
    } catch (error) {
        res.status(500).send({ message: error.message + " ++++" })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers()
        return res.status(200).send(users)
    } catch (error) {
        res.status(500).send({ err: error })
    }
}

module.exports = { getAllUsers, getUserProfile };