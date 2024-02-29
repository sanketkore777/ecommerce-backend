const userService = require('../services/user.service')
const jwtProvider = require('../config/jwtProvider')
const bcrypt = require('bcrypt')
const register = async (req, res) => {
    try {
        const user = await userService.createUser(req.body)
        const jwt = jwtProvider.generateToken(user.id)
        // const cart = await cartService.createCart(user)

        return res.status(200).send({ jwt, message: "user created~!!" })
    } catch (error) {
        return res.status(500).send({ err: error.message })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userService.getUserByEmail(email)
        if (!user) {
            return res.status(500).send({ message: "user does not exist" })
        }
        console.log("step1")
        const isValid = await bcrypt.compare(password, user.password)
        console.log("step2")
        if (!isValid) {
            return res.status(500).send({ message: "invalid password!" })
        }
        console.log("step3")
        const token = jwtProvider.generateToken(user._id)
        console.log("step4")
        return res.status(200).send({ message: "login successfull!", token })
    } catch (error) {
        return res.status(500).send({ err: error.message, msg: "something went wrong" })
    }
}

module.exports = { login, register }