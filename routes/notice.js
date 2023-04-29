const route = require("express").Router()
const Notice = require("../models/NoticeModel")
const User = require("../models/UserModel")
const auth = require("../middleware/auth")
const nodemailer = require("nodemailer");
const { transporter } = require("../nodemailer/mailConfig")


route.post('/addNotice', auth.verifyAdmin, async (req, res) => {
    try {
        const data = Notice.build({ ...req.body }) //adminId: userData.id
        await data.save()

        const users = await User.findAll({
            where: {
                role: ['gym_member', 'gym_trainer', 'admin']
            }
        });
        const mailUsers = users.map((user) => user.email)
        
        let testAccount = await nodemailer.createTestAccount();

        console.log(mailUsers.join(", "))
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Gymster" <shekharr.shresthaa@gmail.com>', // sender address
            to: mailUsers.join(", "), // list of receivers
            subject: req.body.topic, // Subject line
            text: req.body.description, // plain text body
            html: req.body.description, // html body
        });


        res.status(200).send(data.dataValues)
    } catch (error) {
        res.status(500).send(error)
    }
})



route.get("/getNotice", auth.verifyUser, async (req, res) => {
    try {
        const data = await Notice.findAll(
            {
                order: [['createdAt', 'DESC']]
            }
        );
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
})

route.get("/getNotice/:id", auth.verifyUser, async (req, res) => {
    try {
        const data = await Notice.findAll({ where: { id: req.params.id } });
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

route.delete("/deleteNotice/:id", auth.verifyAdmin, async (req, res) => {
    try {
        const data = await Notice.findOne({ where: { id: req.params.id } })
        if (data !== null) {
            await Notice.destroy({ where: { id: req.params.id } });
            res.status(200).send("Successfully Deleted")
        } else {
            res.status(200).send("Invalid Command")
        }
    } catch (error) {
        res.status(500).send(error)

    }
})

route.put('/updateNotice/:id', auth.verifyAdmin, async (req, res) => {
    try {
        const data = await Notice.findOne({ where: { id: req.params.id } })
        if (data !== null) {
            await Notice.update(req.body, { where: { id: req.params.id } })
            res.status(200).send("successfully updated")
        } else {
            res.status(200).send("Invalid Command")
        }
    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = route