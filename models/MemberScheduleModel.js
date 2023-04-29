const { DataTypes } = require("sequelize")
const db = require("../db/conn")

const MemberSchedule = db.define("member_schedule", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    days: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    }
    // sunday: {
    //     type: DataTypes.STRING,
    //     allowNull:false,
    //     unique: false,
    // },
    // monday: {
    //     type: DataTypes.STRING,
    //     allowNull:false,
    //     unique: false,
    // },
    // tuesday: {
    //     type: DataTypes.STRING,
    //     allowNull:false,
    //     unique: false,
    // },
    // wednesday: {
    //     type: DataTypes.STRING,
    //     allowNull:false,
    //     unique: false,
    // },
    // thursday: {
    //     type: DataTypes.STRING,
    //     allowNull:false,
    //     unique: false,
    // },
    // friday: {
    //     type: DataTypes.STRING,
    //     allowNull:false,
    //     unique: false,
    // },

});

module.exports = MemberSchedule;