const route = require("express").Router()
const Checkout = require('../models/CheckoutModel')
const auth = require('../middleware/auth')


route.post('/addCheckout', auth.verifyUser, async (req, res) => {
    console.log("body", req.body)
    try {
        const previousData = await Checkout.findOne({ where: { userId: userData.id } })
        if (previousData) {
            await Checkout.update(req.body, { where: { userId: userData.id } })
        } else {
            await Checkout.create({ ...req.body, userId: userData.id })
        }
        res.status(200).send("success")
    } catch (error) {
        res.status(500).send(error.message)
    }
})

route.get('/checkoutUser', async (req, res) => {
    try {
        const checkoutData = await Checkout.findOne({ where: { userId: userData.id } })
        if (checkoutData) {
            res.status(200).send(checkoutData)
        } else {
            res.status(404).send('Checkout data not found for user')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = route