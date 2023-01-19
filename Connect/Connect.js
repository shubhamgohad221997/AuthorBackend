const mongoose=require("mongoose")
const connect=()=>{
    return mongoose.connect("mongodb+srv://book:book@cluster0.fhjcltj.mongodb.net/?retryWrites=true&w=majority")
}

module.exports=connect;