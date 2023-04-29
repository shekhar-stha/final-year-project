const route = require("express").Router()
const sequelize = require("../db/conn")
const User = require('../models/UserModel')
const Shipping = require('../models/ShippingDetailsModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')


// register user
route.post("/addUser", async (req, res) => {
    const password = req.body.password
    const confirm_password = req.body.confirm_password
    try {
        if (password === confirm_password) {
            const salt = bcrypt.genSaltSync(10)
            const hashPassword = await bcrypt.hash(password, salt)
            const hashConfirm_password = await bcrypt.hash(confirm_password, salt)
            const data = User.build({ ...req.body, password: hashPassword, confirm_password: hashConfirm_password })
            data.role = 'user'
            await data.save()
            res.status(200).json(data.dataValues)
        }
        else {
            res.status(400).json("Password didn't match")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

// Login User
route.post("/loginUser", async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    try {
        const data = await User.findOne({ where: { username: username } })
        console.log(data.dataValues)
        const passwordReq = data.dataValues.password
        const comparePw = await bcrypt.compare(password, passwordReq)
        if (!comparePw) {
            res.status(400).json("User name and password didn't match")
        } else {
            const token = jwt.sign({
                id: data.id,
                role: data.role
            }, "secretkey")

            const dataNeeded = {
                id: data.dataValues.id,
                username: data.dataValues.username,
                role: data.dataValues.role,
                full_name: data.dataValues.full_name,
                phone_number: data.dataValues.phone_number,
                email: data.dataValues.email,
            }
            res.status(200).cookie('token', token, { maxAge: 25920000000 }).json(dataNeeded)
        }

    } catch (error) {
        res.status(500).json("User name and password didn't match")
    }
})


// Show User
route.get("/getUser", auth.verifyUser, async (req, res) => {
    const data = await User.findAll({ include: [{ model: Shipping }] });
    res.status(200).json(data)
})

route.get("/getUser/:userId", auth.verifyUser, async (req, res) => {
    const data = await User.findAll({ where: { id: req.params.userId }, include: [{ model: Shipping }] });
    res.status(200).json(data)
})


// update user
route.put("/updateUser", auth.verifyUser, async (req, res) => {
    try {
        await User.update(req.body, { where: { id: userData.id } });
        const updatedData = await User.findOne({ where: { id: userData.id } });
        const data = { id: updatedData.id, username: updatedData.username, role: updatedData.role, full_name: updatedData.full_name, phone_number: updatedData.phone_number, email: updatedData.email }
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.errors[0].message)
    }
})

module.exports = route;