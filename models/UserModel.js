const { DataTypes } = require("sequelize")
const db = require("../db/conn")

const User = db.define("user", {
    id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey: true
    },
    email:{
        type: DataTypes.STRING,       
        allowNull:false,
        unique: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: [true, "please choose different username"]
    },
    full_name:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    role:{
        type: DataTypes.ENUM('admin','user','gym_member','gym_trainer')
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    },
    confirm_password:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    phone_number:{
        type: DataTypes.STRING,
    }
});

module.exports = User;

// const User = db.define("user", {
//     id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         validate: {
//             isEmail: true // ensures that the email is in the correct format
//         }
//     },
//     username: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: {
//             args: true,
//             msg: "Please choose a different username."
//         },
//         validate: {
//             notEmpty: true // ensures that the username is not an empty string
//         }
//     },
//     full_name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             notEmpty: true // ensures that the full name is not an empty string
//         }
//     },
//     role: {
//         type: DataTypes.ENUM('admin', 'user', 'gym_member', 'gym_trainer'),
//         allowNull: false,
//         defaultValue: 'user' // sets a default role of 'user'
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             notEmpty: true // ensures that the password is not an empty string
//         }
//     },
//     confirm_password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             notEmpty: true, // ensures that the confirmation password is not an empty string
//             matchPassword(confirm_password) { // custom validator to ensure that the confirmation password matches the password
//                 if (this.password !== confirm_password) {
//                     throw new Error("Passwords do not match.");
//                 }
//             }
//         }
//     },
//     phone_number: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         validate: {
//             isNumeric: true // ensures that the phone number only contains numeric characters
//         }
//     }
// });

// module.exports = User;
