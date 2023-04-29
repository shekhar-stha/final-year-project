const { DataTypes } = require("sequelize")
const db = require("../db/conn")

const Message = db.define("message", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    full_name: {
        type: DataTypes.STRING
    },
    number: {
        type: DataTypes.STRING
    },
    message: {
        type: DataTypes.TEXT
    }
});

module.exports = Message;