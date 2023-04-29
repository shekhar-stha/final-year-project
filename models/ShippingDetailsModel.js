const { DataTypes } = require("sequelize")
const db = require("../db/conn")

const ShippngDetails = db.define("shipping_details", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING,
        unique: true
    },
    province: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    landmark: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = ShippngDetails;