const {Seuelize,Datatype} = require('sequelize')
const databaseConfig = require('../config/dbConfig')
const makeBlogTable = require('./blogModel')
//const nayaghar = new Sequelize()
//{
   // DecompressionStream,
   // soundAlarm(),//yo method bho hainha
   // merocycleparkgardey()
//}
/*const {Sequelize,DataTypes} = require('sequelize')

const ghar = new Sequelize('haha','root','',{
    host : 'localhost',
    port : 3306,
    operatorsAliases:false,
    dialect : 'mysql',
    pool:{
        max: 5,//database maa kati otaa user ley
        min:0,
        acquire:3000,
        idle:1000
    }
})
Sequelize.authenticate()
.then(()=>{
    console.log("milyo hai username")
})
.catch((err)=>{
    console.log("error aayo hai",err)
})
const db={}
db.Sequelize=Sequelize
db.sequelize=sequelize
db.sequelize.sync({force:false}).then(()=>{

    console.log("Synced done!!")
})
module.exports = db*/
const {Sequelize,DataTypes} = require('sequelize')
const sequelize = new Sequelize('nodejs','root','',{
    host : 'localhost', 
    port : 3306, 
    dialect : 'mysql', 
    operatorsAliases : false, 
    pool : {
        max : 5, 
        min : 0, 
        acquire : 30000,
        idle : 10000
    }
})

sequelize.authenticate()
.then(()=>{
    console.log("milyo hai username password")
})
.catch((err)=>{
    console.log("error aayo hai",err)
})

const db = {}
db.Sequelize = Sequelize 
db.sequelize = sequelize

db.blogs = makeBlogTable(sequelize,DataTypes)
db.sequelize.sync({force : false}).then(()=>{
    console.log("Synced done!!")
})
module.exports = db 
