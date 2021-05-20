const protect = (req, res, next) => {
    const { user } = req.session

    if (!user) {
        res.status(401).json({status: 'Failure',message: 'Unauthorized user'})
    }

    req.user = user

    next()
}

module.exports = protect