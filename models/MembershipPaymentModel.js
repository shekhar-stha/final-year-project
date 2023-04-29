const { DataTypes } = require("sequelize")
const db = require("../db/conn")

const MembershipPayment = db.define("membership_payment", {
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
    }
});

module.exports = MembershipPayment;