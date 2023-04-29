const route = require("express").Router()
const GymMember = require('../models/GymMemberModel')
const User = require('../models/UserModel')
const Membership = require('../models/MembershipModel')
const MemberSchedule = require('../models/MemberScheduleModel')
const MembershipPayment = require('../models/MembershipPaymentModel')
const Diet = require('../models/DietModel')
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')
const moment = require('moment');
const { Op } = require('sequelize');
// Register Member
route.post("/add-member/:id", auth.verifyUser, async (req, res) => {
    const password = req.body.password
    const confirm_password = req.body.confirm_password
    console.log(req.body)
    try {
        if (password === confirm_password) {
            const salt = bcrypt.genSaltSync(10)
            const hashPassword = await bcrypt.hash(password, salt)
            const hashConfirm_password = await bcrypt.hash(confirm_password, salt)
            try {
                const memberShipData = await Membership.findOne({ where: { id: req.params.id } })
                if (memberShipData !== null) {
                    if (req.body.status === "inactive") {
                        const data = User.build({ ...req.body, password: hashPassword, confirm_password: hashConfirm_password })
                        data.role = 'gym_member'
                        await data.save()
                        const memberData = await GymMember.create({ ...req.body, userId: data.id, membershipId: req.params.id })
                        res.status(200).json(memberData.dataValues)
                    } else {
                        const startDate = new Date(req.body.joined_date);
                        const membershipDuration = memberShipData.duration;
                        const expiryDate = new Date(startDate.setMonth(startDate.getMonth() + membershipDuration))

                        console.log(startDate, expiryDate)
                        if (expiryDate !== null) {
                            const data = User.build({ ...req.body, password: hashPassword, confirm_password: hashConfirm_password })
                            data.role = 'gym_member'
                            await data.save()
                            const memberData = await GymMember.create(
                                {
                                    ...req.body,
                                    userId: data.id,
                                    membershipId: req.params.id,
                                    end_date: expiryDate
                                })
                            await MembershipPayment.create(
                                {
                                    membershipId: req.params.id,
                                    amount: memberShipData.total_price,
                                    userId: data.id
                                })
                            res.status(200).json(memberData.dataValues)
                            console.log(startDate, expiryDate)
                        }
                    }
                }
                else {
                    res.status(400).json("membership not valid")
                }
            } catch (error) {
                console.log(error)
                res.status(500).json(error.errors[0].message)
            }
        }
        else {
            res.status(400).json("Password didn't match")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

route.get("/getMember", auth.verifyGym_member, async (req, res) => {
    try {
        const searchQuery = req.query.search;
        console.log("search query", searchQuery)
        const data = await User.findAll({
            include: [
                {
                    model: GymMember,
                    include: [{ model: Membership }],
                },
            ],
            where: {
                role: 'gym_member',
                [Op.or]: [
                    { full_name: { [Op.iLike]: `%${searchQuery}%` } },
                    { username: { [Op.iLike]: `%${searchQuery}%` } }
                ]
            },
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});


route.get("/latestMembers", auth.verifyGym_member, async (req, res) => {
    try {
        const latestMembers = await User.findAll({
            include: [
                {
                    model: GymMember,
                    include: [{ model: Membership }],
                },
            ],
            where: { role: "gym_member" },
            order: [["createdAt", "DESC"]],
            limit: 4,
        });
        res.status(200).json(latestMembers);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

route.get("/getMemberCount", auth.verifyGym_member, async (req, res) => {
    try {
        const data = await User.findAndCountAll({
            include: [
                {
                    model: GymMember,
                    include: [{ model: Membership }],
                    where: { gender: ["male", "female"] }, // Filter only male and female gym members
                },
            ],
            where: { role: "gym_member" },
        });

        const maleCount = data.rows.filter((row) => row.gym_member.gender === "male").length;
        const femaleCount = data.rows.filter((row) => row.gym_member.gender === "female").length;

        res.status(200).json({
            maleCount,
            femaleCount,
            totalCount: maleCount + femaleCount,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});


// Show one member
route.get("/getMember/:userId", auth.verifyUser, async (req, res) => {
    try {
        const data = await User.findOne({ where: { id: req.params.userId }, include: [{ model: GymMember, include: [{ model: Membership }] }] })
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Member with schedule
route.get("/get-member-with-schedule/:userId", auth.verifyUser, async (req, res) => {
    try {
        const data = await User.findOne({ where: { id: req.params.userId }, include: [{ model: GymMember, include: [{ model: MemberSchedule }] }] })
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Member with diet
route.get("/get-member-with-diet/:userId", auth.verifyUser, async (req, res) => {
    try {
        const data = await User.findOne({ where: { id: req.params.userId }, include: [{ model: GymMember, include: [{ model: Diet }] }] })
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

// update member
route.patch("/updateMember/:userId", auth.verifyGym_member, async (req, res) => {
    try {
        const memberData = await GymMember.findOne({ where: { userId: req.params.userId } })
        if (memberData !== null) {
            await User.update(req.body, { where: { id: req.params.userId } })
            await GymMember.update(req.body, { where: { userId: req.params.userId } });
            res.status(200).send("successfully updated")
        } else {
            res.status(200).send("Member not found")
        }
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})

// activate account
route.patch("/activateAccount/:userId", auth.verifyUser, async (req, res) => {
    try {
        const memberData = await GymMember.findOne({ where: { userId: req.params.userId } })
        console.log("Member Data", memberData)
        const memberShipData = await Membership.findOne({ where: { id: memberData?.membershipId } })
        if (memberData !== null) {
            if (memberShipData !== null) {
                const membershipDuration = memberShipData.duration; // Duration in months
                const startDate = moment();
                const expiryDate = (moment(startDate).add(membershipDuration, 'months')).format("YYYY-MM-DD");
                console.log(startDate, expiryDate)
                if (expiryDate !== null) {
                    // 
                    const data = await GymMember.update({ ...req.body, end_date: expiryDate }, { where: { userId: req.params.userId } });
                    console.log("memberdata", data)
                    console.log(data.userId)
                    console.log(data.membershipId)
                    console.log("body", req.body)
                    await MembershipPayment.create({ ...req.body, userId: req.params.userId, membershipId: memberData?.membershipId })
                    res.status(200).send("successfully updated")
                } else {
                    res.status(404).send("expiry error")
                }
            } else {
                res.status(404).send("Membership not found")
            }
        } else {
            res.status(404).send("Member not found")
        }
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})

route.patch('/renewMembership/:userId', auth.verifyAdmin, async (req, res) => {
    try {
        const memberData = await GymMember.findOne({ where: { userId: req.params.userId } })
        console.log("Member Data", memberData)
        const memberShipData = await Membership.findOne({ where: { id: req.body.membershipId } })
        console.log(memberShipData)
        if (memberData !== null) {
            if (memberShipData !== null) {
                const membershipDuration = memberShipData.duration; // Duration in months
                const renewDate = moment();
                const expiryDate = (moment(renewDate).add(membershipDuration, 'months')).format("YYYY-MM-DD");
                console.log(renewDate, expiryDate)
                if (expiryDate !== null) {
                    // 
                    const data = await GymMember.update(
                        {
                            ...req.body, status: "active",
                            renew_date: renewDate,
                            end_date: expiryDate,
                            membershipId: req.body.membershipId
                        }
                        , { where: { userId: req.params.userId } });
                    console.log("memberdata", data)
                    console.log(data.userId)
                    console.log(data.membershipId)
                    console.log("body", req.body)
                    await MembershipPayment.create({ ...req.body, amount: memberShipData.price, userId: req.params.userId })
                    res.status(200).send("successfully updated")
                } else {
                    res.status(404).send("expiry error")
                }
            } else {
                res.status(404).send("Membership not found")
            }
        } else {
            res.status(404).send("Member not found")
        }
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})


route.delete("/deleteMember/:id", auth.verifyAdmin, async (req, res) => {
    const data = await User.findOne({ where: { id: req.params.id } })
    try {
        if (data !== null) {
            await User.destroy({ where: { id: req.params.id } });
            res.status(200).json("Successfully deleted")
        } else {
            res.status(404).send("User not found")
        }
    } catch (error) {
        res.status(500).send(error)

    }
})

route.get("/payment", auth.verifyAdmin, async (req, res) => {
    const data = await MembershipPayment.findAll()
    try {
        if (data !== null) {
            res.status(200).json(data)
        } else {
            res.status(404).send("No payments found")
        }
    } catch (error) {
        res.status(500).send(error)

    }
})


module.exports = route;