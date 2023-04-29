const route = require("express").Router()
const auth = require('../middleware/auth')
const Message = require('../models/MessageModel')


route.post('/sendMessage', auth.verifyUser, async (req, res) => {
    try {
        const data = await Message.create({ ...req.body, userId: userData.id })
        res.status(200).send(data)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

route.get("/getMessages", auth.verifyAdmin, async (req, res) => {
    try {
        const data = await Message.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = route;