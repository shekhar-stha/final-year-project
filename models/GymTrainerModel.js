const { DataTypes } = require("sequelize")
const db = require("../db/conn")

const GymTrainer = db.define("gym_trainer", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    gender:{
        type: DataTypes.ENUM('male','female','others'),
        allowNull:false,
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull:false,
    },
    routine: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull:false,
    }
});

module.exports = GymTrainer;