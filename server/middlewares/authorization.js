const authorization = (roles) => (req,res,next) => {
    const userRole = req.currentUser.role
    if(!roles.includes(userRole)) {
        return next({name: "Unauthorize"})
    }
    next()
}

module.exports = authorization