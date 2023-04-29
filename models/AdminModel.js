const { DataTypes } = require("sequelize")
const db = require("../db/conn")

const Admin = db.define("admin", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    address: {
        type: DataTypes.STRING,
    }
});

module.exports = Admin;