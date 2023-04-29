const jwt = require('jsonwebtoken')

module.exports.verifyUser = (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) res.status(400).send("You need to login first.")
        try {
            const verifyUser = jwt.verify(token, 'secretkey')
            userData = verifyUser
            next()
        } catch (error) {
            res.status(404).json("You aren't authorized")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}
module.exports.verifyAdmin = (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) res.status(400).send("You need to login first.")

        try {
            const verifyUser = jwt.verify(token, 'secretkey')
            if (verifyUser.role === 'admin') {
                userData = verifyUser
                next()
            }
            else {
                res.status(404).json("You aren't authorized")
            }
        } catch (error) {
            res.status(404).json("You aren't authorized")
        }
    } catch (error) {
        res.status(500).json(error)
    }

}

module.exports.verifyGym_member = (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) res.status(400).send("You need to login first.")

        try {
            const verifyUser = jwt.verify(token, 'secretkey')
            if
                (verifyUser.role === 'gym_member'
                || verifyUser.role === 'admin'
                || verifyUser.role === 'gym_trainer') {
                userData = verifyUser
                next()
            }
            else {
                res.status(404).json("You aren't authorized")
            }
        } catch (error) {
            res.status(404).json("You aren't authorized")
        }
    } catch (error) {
        res.status(500).json(error)
    }

}

module.exports.verifyGym_trainer = (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) res.status(400).send("You need to login first.")
        try {
            const verifyUser = jwt.verify(token, 'secretkey')
            if (verifyUser.role === 'gym_trainer' || verifyUser.role === 'admin') {
                userData = verifyUser
                next()
            }
            else {
                res.status(404).json("You aren't authorized")
            }
        } catch (error) {
            res.status(404).json("You aren't authorized")
        }
    } catch (error) {
        res.status(500).json(error)
    }

}