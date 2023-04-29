const { DataTypes } = require("sequelize")
const db = require("../db/conn")

const ProductPayment = db.define("product_payment", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    amount: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = ProductPayment;