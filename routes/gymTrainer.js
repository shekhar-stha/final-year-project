const route = require("express").Router()
const GymTrainer = require('../models/GymTrainerModel')
const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')


// Register Admin
route.post("/addTrainer", async (req, res) => {
    const password = req.body.password
    const confirm_password = req.body.confirm_password
    try {
        if (password === confirm_password) {
            const salt = bcrypt.genSaltSync(10)
            const hashPassword = await bcrypt.hash(password, salt)
            const hashConfirm_password = await bcrypt.hash(confirm_password, salt)
            const data = User.build({ ...req.body, password: hashPassword, confirm_password: hashConfirm_password })
            data.role = 'gym_trainer'
            await data.save()
            try {
                const trainerData = GymTrainer.build({ ...req.body, userId: data.id })
                await trainerData.save()
                res.status(200).json(data.dataValues)
            } catch (error) {
                res.status(400).json(error)
            }
        }
        else {
            res.status(400).json("Password didn't match")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})


// Show Trainer
route.get("/getTrainer", auth.verifyGym_trainer, async (req, res) => {

    const data = await User.findAll({ include: GymTrainer });
    const trainerData = data.filter(user => user.role === 'gym_trainer')
    res.status(200).json(trainerData)
})

// update trainer
// route.put("/updateTrainer", auth.verifyGym_trainer, async (req, res) => {
//     try {
//         const trainerData = GymTrainer.findOne({ where: { userId: userData.id } })
//         await GymTrainer.update(req.body, { where: { id: trainerData.id } });
//         await User.update(req.body, { where: { id: userData.id } });
//         const updatedData = await GymTrainer.findOne({ where: { userId: gymMemberData.id } });
//         res.status(200).json(updatedData)
//     } catch (error) {
//         res.status(500).json(error)
//     }
// })

route.put("/updateTrainer/:userId", auth.verifyGym_member, async (req, res) => {
    try {
        const trainerData = await GymTrainer.findOne({ where: { userId: req.params.userId } })
        if (trainerData !== null) {
            await User.update(req.body, { where: { id: req.params.userId } })
            await GymTrainer.update(req.body, { where: { userId: req.params.userId } });
            res.status(200).send("successfully updated")
        } else {
            res.status(200).send("Trainer not found")
        }
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})

// Show one Trainer
route.get("/getTrainer/:userId", auth.verifyGym_trainer, async (req, res) => {
    try {
        const data = await User.findOne({ where: { id: req.params.userId }, include: [{ model: GymTrainer }] })
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send(error)
    }
})


route.delete("/deleteTrainer/:id", auth.verifyAdmin, async (req, res) => {
    const data = await User.findOne({ where: { id: req.params.id } })
    try {
        if (data !== null) {
            await User.destroy({ where: { id: req.params.id } });
            res.status(200).json("Successfully deleted")
        } else {
            res.status(200).send("User not found")
        }
    } catch (error) {
        res.status(500).send(error)

    }
})

module.exports = route;