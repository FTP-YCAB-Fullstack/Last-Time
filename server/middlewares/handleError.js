const handleError = (error , req, res,next) => {
    let statusCode = 500
    let errMessage = "Internal server error"
    
    switch (error.name) {
        case "Error":
            errMessage = error.message
            break
        case "SequelizeUniqueConstraintError":
            errMessage = error.message
            break
        case "Unauthorize":
            statusCode = 401
            errMessage = "Unauthorize access"
            break
        case "Unauthenticated":
            statusCode = 401
            errMessage = error.message || "Unauthenticated"
            break
        case "NotFound":
            statusCode = 404
            errMessage = "The requested resource was not found"
            break
        case "Forbidden":
            statusCode = 403
            errMessage = "Access to that resource is forbidden"
            break
        case "Validation" :
            statusCode = 400
            errMessage = error.message || "Bad Request"
            break
        case "ValidationError":
            statusCode = error.statusCode
            errMessage = error.details.body || "Bad Request"
            break
        default:
            errMessage = error.message || "Internal Server Error"
    }
    console.log(error)
    res.status(statusCode).json({
        message: errMessage
    })
}

module.exports = handleError