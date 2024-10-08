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
//const { blogs, sequelize } = require('./model/index')
const { blogs, sequelize, users } = require('./model/index')
// const multer = require('./middleware/multerConfig').multer
// const storage = require('./middleware/multerConfig').storage
const {multer,storage,storage2,storage3} = require('./middleware/multerConfig')
const upload = multer({storage:storage})
const bcrypt = require("bcrypt")



const app = express()

// app.use(express.json())

app.set('view engine','ejs')
require("./model/index")
app.use(express.urlencoded({extended : true}))
app.get("/",async (req,res)=>{
    const datas = await blogs.findAll() // select * from blogs returns array 
   
    res.render("home",{blogs : datas})
 })
 
 app.get("/blog/:id",async (req,res)=>{
     const id = req.params.id
     const blog =  await blogs.findByPk(id) // returns object 
 
     res.render("singleBlog.ejs",{blog : blog})
 })
 
 app.get("/delete/:id",async (req,res)=>{
     const id = req.params.id
     await blogs.destroy({
         where : {
             id : id
         }
     })
     res.redirect("/")
 })

app.get("/create",(req,res)=>{
    res.render("create")

})

app.post('/create',upload.single('image'),async (req,res)=>{
    // const title = req.body.title 
    // const subtitle = req.body.subtitle 
    // const description = req.body.description
    const filename =req.file.filename
    const {title,subtitle,description} = req.body 
   await blogs.create({
        title : title,
        subtitle : subtitle, 
        description : description,
        image : filename
    })
    res.send("Blog added successfully")

})
app.get("/register",(req,res)=>{
    res.render("register")
})

app.post("/register",async (req,res)=>{
    const {username,email,password} = req.body
    await users.create({
        username , 
        email, 
        password : bcrypt.hashSync(password,8)
    })
    res.redirect("/login")
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.post("/login",async (req,res)=>{
    const {email,password} = req.body
    // check whether that email exist or not in users table 
   const data = await users.findAll({
        where : {
            email : email
        }
    })
    if(data.length ==0){
        res.send("No user with that email")
    }else{
        // now check password 
       const isMatched =  bcrypt.compareSync(password,data[0].password)
       if(isMatched){
        res.send("Logged in success")
       }else{
        res.send("Invalid password")
       }
    }
    
})



app.use(express.static('public/css/'))

app.listen(3000,()=>{
    console.log("project suru vayo hai tw nodejs ko")
})


