const pagination = (req,res,next) => {
    let {page} = req.query
    page = page ? page : 1
    req.page = page
    next()
}

module.exports = pagination