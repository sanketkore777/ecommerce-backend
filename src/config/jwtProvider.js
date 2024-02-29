const jwt = require('jsonwebtoken')
const SECRET_KEY = "snakertkrpesaganeshkoresanfdkeronadfsdfkjdaeryanfbelelfjsljdk"
const generateToken = (uId) => {
    const token = jwt.sign({ uId }, SECRET_KEY, { expiresIn: "48h" })
    return token
}

const getUserIdFromToken = (token) => {
    const decodeToken = jwt.verify(token, SECRET_KEY)
    return decodeToken.uId
}

module.exports = { getUserIdFromToken, generateToken }