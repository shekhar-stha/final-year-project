const { DataTypes } = require("sequelize")
const db = require("../db/conn")

const Notice = db.define("notice", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    topic: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    }
});

module.exports = Notice;