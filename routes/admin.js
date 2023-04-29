const route = require("express").Router()
const Admin = require('../models/AdminModel')
const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')


// Register Admin
route.post("/addAdmin", async (req, res) => {
    const password = req.body.password
    const confirm_password = req.body.confirm_password
    try {
        if (password === confirm_password) {
            const salt = bcrypt.genSaltSync(10)
            const hashPassword = await bcrypt.hash(password, salt)
            const hashConfirm_password = await bcrypt.hash(confirm_password, salt)
            const data = User.build({ ...req.body, password: hashPassword, confirm_password: hashConfirm_password })
            data.role = 'admin'
            await data.save()
            try {
                const adminData = Admin.build({ ...req.body, userId: data.id })
                await adminData.save()
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


// Show Admin
route.get("/getAdmin", auth.verifyAdmin, async (req, res) => {
    try {
        const data = await User.findAll({ include: Admin });
        const adminData = data.filter(admin => admin.role === 'admin')
        console.log(JSON.stringify(data, null, 2));
        res.status(200).json(adminData)

    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = route;