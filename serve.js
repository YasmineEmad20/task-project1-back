require('dotenv').config()
const express=require('express')
const app=express()
const path=require('path')
const mongodb=require('mongodb')
const mongoClient=mongodb.MongoClient
const connectionUrl='mongodb://127.0.0.1:270'
const cors=require('cors')
const mongoose=require('mongoose')
const cookieParser=require("cookie-parser")
const { connect } = require('http2')
const connectDB = require('./config/dbConn')

const PORT=process.env.PORT||5000
connectDB()
app.use(express.json())
app.use(cors());
app.use(cookieParser);
require('./mongoose')
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes/root'))
app.all('*', (req,res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views', '404.html'))
    }else if(req.accepts('json')){
        res.send({message:"404 not found"})
    }else{
        res.type('text').send('404 not found')
    }
})

mongoose.connection.once('open', ()=>{
    console.log('connected to mongoDB')
 app.listen(PORT , ()=> console.log(`sever running on port ${PORT}`))
})