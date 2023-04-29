const cron = require('node-cron');
const GymMember = require('../models/GymMemberModel')
const nodemailer = require("nodemailer");
const { transporter } = require("../nodemailer/mailConfig");
const User = require('../models/UserModel');
const Admin = require('../models/AdminModel')
const { Op } = require('sequelize');

const updateMemberStatus = async () => {
    let testAccount = await nodemailer.createTestAccount();

    const currentDateOnly = new Date().toISOString().slice(0, 10);
    console.log(currentDateOnly)
    const adminData = await User.findAll({
        include: { model: Admin },
        where: { role: 'admin' }
    });

    const members = await GymMember.findAll({
        where: {
            status: 'active',
            end_date: {
                [Op.lte]: currentDateOnly
            }
        },
        include: {
            model: User
        }
    });

    console.log(members)


    console.log(`Updating ${members.length} member(s) status to inactive...`);

    const promises = members.map(member => {
        console.log(member.user)
        return member.update({ status: 'inactive' })
    })

    await Promise.all(promises)

    const adminMail = adminData.map((admin) => admin.email)
    console.log(adminMail)
    const expiredMembers = members.map((member) => member.user.email)
    const expiredMembersName = members.map((member) => member?.user?.full_name)

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Gymster" <shekharr.shresthaa@gmail.com>', // sender address
        to: expiredMembers.join(", "), // list of receivers
        subject: "Membership expired", // Subject line
        html: `
        <h4>Dear member,</h4>
        <p>Your membership has expired. We hope you enjoyed your time with us and achieved your fitness goals!</p>
        <p>If you would like to renew your membership, please log in to your account and visit the Membership page.</p>
        <p>Thank you for choosing us. We look forward to seeing you again soon!</p>
    `,
    });

    let adminInfo = await transporter.sendMail({
        from: '"Gymster" <shekharr.shresthaa@gmail.com>',
        to: adminMail.join(", "),
        subject: "Members whose membership is finished",
        html: `
        <p>These members membership has been expired:</p>
        ${expiredMembersName}
    `,
    });

    console.log(`Finished updating member status.`);
}


const statusCronJob = cron.schedule('06 21 * * *', async () => {
    console.log('Running cron job to update member status...');
    await updateMemberStatus();
});



module.exports = statusCronJob;
