const {DataTypes} = require("sequelize")
const db = require("../db/conn")

const GymMember = db.define("gym_member", {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    gender:{
        type: DataTypes.ENUM('male','female','others'),
        allowNull: false
    },
    dob:{
        type: DataTypes.DATE,
        allowNull: false
    },
    address:{
        type: DataTypes.STRING,
        allowNull: false
    },
    joined_date:{
        type: DataTypes.DATE,
    },
    renew_date:{
        type: DataTypes.DATE,
    },
    end_date:{
        type: DataTypes.DATEONLY,
        get: function() {
            const rawValue = this.getDataValue('end_date');
            if (!rawValue) {
                return null;
            }
            const date = new Date(rawValue);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
    },
    status:{
        type: DataTypes.ENUM('active','inactive','grace'),
        allowNull: false
    }
});

module.exports = GymMember;


// const GymMember = db.define("gym_member", {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     gender: {
//       type: DataTypes.ENUM("male", "female", "others"),
//       allowNull: false,
//       validate: {
//         notNull: true,
//       },
//     },
//     dob: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       validate: {
//         notNull: true,
//       },
//     },
//     address: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notNull: true,
//         len: [5, 100],
//       },
//     },
//     joined_date: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       validate: {
//         notNull: true,
//       },
//     },
//     end_date: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     status: {
//       type: DataTypes.ENUM("active", "inactive", "grace"),
//       allowNull: false,
//       validate: {
//         notNull: true,
//       },
//     },
//     weight: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     height: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//   });
  
//   module.exports = GymMember;