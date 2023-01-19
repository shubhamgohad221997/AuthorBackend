const mongoose=require("mongoose")
const express=require("express");
const connect = require("./Connect/Connect");
const Author = require("./AuthorModel/Author.Router");
const book = require("./BookModel/Book.Router");
// connect=require("./Connect/Connect")

const PORT= process.env.PORT || 8080;
const server=express()
mongoose.set('strictQuery', false)
server.use(express.json())
server.get("/",(req,res)=>{
    return res.send("Welcome to my server")
})

server.use("/author",Author)
server.use("/book",book)
server.listen(PORT, async(req, res)=>{
    await connect()
    console.log(`server start on ${PORT}`)
})