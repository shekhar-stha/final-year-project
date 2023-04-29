const route = require("express").Router()
const auth = require('../middleware/auth')
const MemberSchedule = require('../models/MemberScheduleModel')


route.post('/postSchedule', auth.verifyGym_trainer, async (req, res) => {
    try {
        const data = await MemberSchedule.create(req.body)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

route.put('/updateSchedule/:id', auth.verifyGym_trainer, async (req, res) => {
    try {
        const data = await MemberSchedule.findOne({ where: { id: req.params.id } })
        if (data !== null) {
            await MemberSchedule.update(req.body, { where: { id: req.params.id } })
            res.status(200).send("successfully updated")
        } else {
            res.status(200).send("schedule not found")
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

route.get("/getSchedule", auth.verifyUser, async (req, res) => {
    try {
        const data = await MemberSchedule.findAll();
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

route.get("/getSchedule/:scheduleId", auth.verifyUser, async (req, res) => {
    const data = await MemberSchedule.findOne({ where: { id: req.params.scheduleId } })
    try {
        if (data !== null) {
            res.status(200).json(data)
        } else {
            res.status(200).send("Schedule not found")
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

route.delete("/deleteSchedule/:id", auth.verifyUser, async (req, res) => {
    const data = await MemberSchedule.findOne({ where: { id: req.params.id } })
    try {
        if (data !== null) {
            await MemberSchedule.destroy({ where: { id: req.params.id } });
            res.status(200).json("Successfully deleted")
        } else {
            res.status(200).send("Schedule not found")
        }
    } catch (error) {
        res.status(500).send(error)

    }
})


module.exports = route; 