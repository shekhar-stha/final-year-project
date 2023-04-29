const route = require("express").Router()
const auth = require('../middleware/auth')
const Membership = require('../models/MembershipModel')


route.post('/postMembership', auth.verifyAdmin, async (req, res) => {
    try {
        const data = await Membership.create(req.body)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)
    }

})

route.put('/updateMembership/:id', auth.verifyAdmin, async (req, res) => {
    try {
        const data = await Membership.findOne({ where: { id: req.params.id } })
        if (data !== null) {
            await Membership.update(req.body, { where: { id: req.params.id } })
            res.status(200).send("successfully updated")
        } else {
            res.status(200).send("Membership not found")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

})

route.get("/getMembership", async (req, res) => {
    try {
        const data = await Membership.findAll();
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

route.get("/getMembership/:membershipId", async (req, res) => {
    const data = await Membership.findOne({ where: { id: req.params.membershipId } })
    try {
        if (data !== null) {
            res.status(200).json(data)
        } else {
            res.status(200).send("Membership not found")
        }
    } catch (error) {
        res.status(500).send(error)
    }
})
route.delete("/deleteMembership/:id", auth.verifyUser, async (req, res) => {
    const data = await Membership.findOne({ where: { id: req.params.id } })
    try {
        if (data !== null) {
            await Membership.destroy({ where: { id: req.params.id } });
            res.status(200).json("Successfully deleted")
        } else {
            res.status(200).send("Membership not found")
        }
    } catch (error) {
        res.status(500).send(error)

    }
})




module.exports = route;