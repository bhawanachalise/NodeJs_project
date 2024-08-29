/*require('dotenv').config()
//const { name } = require('ejs')
const express = require('express')//bhadaa lai aago baley jasto ho
const { INSERT } = require('sequelize/lib/query-types')

const app = express()//2 line jasari nii  chainxa rataa haniii
app.eventNames('/',(req,res)=>{
res.send("Hello World")
})

//require('dotenv').config()
app.set('view engine','ejs')//environment configuration set gardey bahnera yo code hanixa
app.get("/create",(req,res)=>{
res.render('create.ejs')
})

app.post('/create',(req,res)=>{
    
})

require("./model/index")
app.use(express.urlencoded({extended : true}))

app.get("/create",(req,res)=>{
    res.render("create")

/*app.get('/',(req,res)=>{
   const data = {
    name:"Bhawana Chalise",
    age:22,
    location:'Chitwan'
   }
   const nepal = {
    continent : 'asia',
   }
   res.render("home.ejs",{
haha:data,
hehe:nepal
   
})
})

/*app.get('/about',(req,res)=>{
res.send("This is about page")
})

app.get('/contact',(req,res)=>{
    res.send("This is contact page")
})

app.use(express.static('public/css/'))//yo chai read garnha dey bhanera yahaa to crete garinxa

app.listen(3000,()=>{
console.log("project suru bho hai node js ko")
})

listen method
function haha(fn){
    console.log("haha")
}
haha(()=>{
})
*/

require('dotenv').config()
// const app = require('express')()
const express = require('express')
const { blogs, sequelize } = require('./model/index')




const app = express()

// app.use(express.json())

app.set('view engine','ejs')
require("./model/index")
app.use(express.urlencoded({extended : true}))

app.get("/create",(req,res)=>{
    res.render("create")

})

app.post('/create',async (req,res)=>{
    // const title = req.body.title 
    // const subtitle = req.body.subtitle 
    // const description = req.body.description
    const {title,subtitle,description} = req.body 
   await blogs.create({
        title : title,
        subtitle : subtitle, 
        description : description
    })
    res.send("Blog added successfully")

})



app.use(express.static('public/css/'))

app.listen(3000,()=>{
    console.log("project suru vayo hai tw nodejs ko")
})


