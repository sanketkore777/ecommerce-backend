const User = require('../Models/user.model')
const bcrypt = require('bcrypt')
const jwtProvider = require('../config/jwtProvider')

const createUser = async (userData) => {
    try {
        let { firstName, lastName, email, password } = userData;
        let isUserExist = await User.findOne({ email });
        if (isUserExist) {
            throw new Error("User already exists!")
        }
        password = await bcrypt.hash(password, 8)
        const user = await User.create({ firstName, lastName, email, password })
        console.log("user created :/", user)

        return user;
    } catch (error) {
        throw new Error(error)
    }
}

const getUserById = (id) => {
    try {
        const user = User.findById(id)
        // .populate("address")
        if (!user) {
            throw new Error("User by Id does not exist")
        }
        console.log(user)
        return user
    } catch (error) {
        console.log("error : " + error)
    }
}

const getUserByEmail = (email) => {
    try {
        const user = User.findOne({ email })
        if (!user) {
            throw new Error("User by email does not exist")
        }
        console.log(user)
        return user
    } catch (error) {
        console.log("error :" + error)
    }
}

const getUserProfileByToken = async (token) => {
    try {
        console.log(token, "njhbjhjnjh")
        const id = await jwtProvider.getUserIdFromToken(token);
        console.log(id + "++++++++++++")
        const user = await getUserById(id);

        if (!user) {
            throw new Error("user not found for token")
        }
        return user
    } catch (error) {
        console.log(error)
        // throw new Error(error)
    }
}

const getAllUsers = async () => {
    try {
        const users = await User.find({});
        return users
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = { createUser, getUserByEmail, getUserById, getAllUsers, getUserProfileByToken }