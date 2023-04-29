const { DataTypes } = require("sequelize")
const db = require("../db/conn")

const Checkout = db.define("checkout", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Checkout;