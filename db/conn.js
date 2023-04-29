const {Sequelize } = require('sequelize')

const sequelize = new Sequelize('gymster', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres'
})

sequelize.authenticate().then(()=>{
  console.log('Connection has been established successfully.')
}).catch((err)=>{
  console.log('Unable to connect to the database:', err);
})


sequelize.sync({ alter: true }).then(()=>{
  console.log("success db")
}).catch((err)=>{
  console.log(err)
})

module.exports = sequelize;