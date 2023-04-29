const { DataTypes } = require("sequelize")
const db = require("../db/conn")

const Products = db.define("product", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    genre: {
        type: DataTypes.ENUM('supplements', 'clothes', 'accessories', 'others', 'gadgets')
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
    },
    discount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: false
    },
    img1: {
        type: DataTypes.STRING,
    },
    img2: {
        type: DataTypes.STRING,
    },
    img3: {
        type: DataTypes.STRING,
    }

});

module.exports = Products;