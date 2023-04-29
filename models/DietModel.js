const { DataTypes } = require("sequelize")
const db = require("../db/conn")

const Diet = db.define("diet", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    diet_type: {
        type: DataTypes.ENUM('Bulking','Cutting','Maintenance diet'),
        allowNull:false,
    },
    meal: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    }

});

module.exports = Diet;