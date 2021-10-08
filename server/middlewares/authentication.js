const jwt = require('jsonwebtoken')
const { User } = require('../models')

const authentication = async (req,res,next) => {
    try {
        const {token} = req.headers
        if(!token) {
            return next({ name: 'Unauthenticated' })
        }
        
        // verify token
        const jwtPayload = jwt.verify(token , process.env.JWT_SECRET_KEY)

        // check user
        const dataUser = await User.findByPk(jwtPayload.userId)
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