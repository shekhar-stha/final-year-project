const { DataTypes } = require("sequelize")
const db = require("../db/conn")

const Membership = db.define("membership", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    admission_fee: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_price: {
        type: DataTypes.VIRTUAL,
        get() {
            return this.get('price') + this.get('admission_fee');
        }
    },
    description: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    }
});

module.exports = Membership;