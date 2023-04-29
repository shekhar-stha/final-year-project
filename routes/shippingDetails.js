const route = require("express").Router()
const { where } = require("sequelize")
const auth = require('../middleware/auth')
const ShippingDetails = require('../models/ShippingDetailsModel')


route.post('/addShippingDetails', auth.verifyUser, async (req, res) => {
    const existingShippingDetails = await ShippingDetails.findAll({ where: { userId: userData.id } })
    try {
        if (existingShippingDetails.length < 2) {
            const data = await ShippingDetails.create({ ...req.body, userId: userData.id })
            res.status(200).send(data)
        } else {
            res.status(404).send({ errors: [{ message: "Already 2 shipping details" }] });
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

route.put('/updateShippingDetails/:id', auth.verifyUser, async (req, res) => {
    try {
        const data = await ShippingDetails.findOne({ where: { id: req.params.id } })
        if (data !== null) {
            await ShippingDetails.update(req.body, { where: { id: req.params.id } })
            res.status(200).send("successfully updated")
        } else {
            res.status(200).send("Invalid Command")
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

route.delete("/deleteShippingDetails/:id", auth.verifyUser, async (req, res) => {
    try {
        const data = await ShippingDetails.findOne({ where: { id: req.params.id } })
        if (data !== null) {
            await ShippingDetails.destroy({ where: { id: req.params.id } });
            res.status(200).send("Successfully Deleted")
        } else {
            res.status(200).send("Invalid Command")
        }
    } catch (error) {
        res.status(500).send(error)

    }
})

route.get("/getShippingDetails", auth.verifyUser, async (req, res) => {
    try {
        const data = await ShippingDetails.findAll();
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

route.get("/getShippingDetailsUser/:userId", auth.verifyUser, async (req, res) => {
    try {
        const data = await ShippingDetails.findAll({ where: { userId: req.params.userId } });
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

route.get("/getShippingDetailsWithUser", auth.verifyUser, async (req, res) => {
    try {
        const data = await ShippingDetails.findAll({ where: { userId: userData.id } });
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

route.get("/getOneShippingDetails/:shippingId", auth.verifyUser, async (req, res) => {
    try {
        const data = await ShippingDetails.findOne({ where: { id: req.params.shippingId } });
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send(error)
    }
})





module.exports = route;