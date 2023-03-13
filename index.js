const mongoose=require("mongoose")
const express=require("express");
const connect = require("./Connect/Connect");
const Author = require("./AuthorModel/Author.Router");
const book = require("./BookModel/Book.Router");
const dailyRecord = require("./Daily_Record_Model/Record.Router");
const cors=require("cors")
// connect=require("./Connect/Connect")

const PORT= process.env.PORT || 8080;
const server=express()
server.use(cors())
mongoose.set('strictQuery', false)
server.use(express.json())
server.get("/",(req,res)=>{
    return res.send("Welcome to my server")
})

server.use("/author",Author)
server.use("/book",book)
server.use("/record", dailyRecord)
server.listen(PORT, async(req, res)=>{
    await connect()
    console.log(`server start on ${PORT}`)
})