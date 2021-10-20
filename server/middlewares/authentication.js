const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authentication = async (req,res,next) => {
    try {
        const {token} = req.headers
        if(!token) {
            return next({ name: 'Unauthenticated' })
        }
        
        // verify token
        const jwtPayload = jwt.verify(token , process.env.JWT_KEY)
        
        // check user
        const dataUser = await User.findById(jwtPayload.userId)
        if(!dataUser) {
            return next({ name: 'Unauthenticated' , message: "Invalid access token." })
        }
        req.currentUser = dataUser
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication