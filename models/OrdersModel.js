const { DataTypes } = require("sequelize")
const db = require("../db/conn")

const Orders = db.define("orders", {
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
    ordered_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Delivered', 'Cancelled', 'Shipping', "Pending"),
        allowNull: false,
    },
    delivered_date: {
        type: DataTypes.DATE,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    payment_type: {
        type: DataTypes.ENUM('COD', 'Khalti'),
        allowNull: false,
    },
    product: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    shipping_detail: {
        type: DataTypes.JSON,
        allowNull: false,
    }

});

module.exports = Orders;