
const mongoose=require("mongoose")

const BookSchema=new mongoose.Schema({
    BookId:{type:Number, require:true},
    Title:{type:String},
    AuthorId:{type:mongoose.Schema.ObjectId,ref:"Bookauthor",required:true},
// AuthorId:{type:Number},
Publisher:{type:String},
PublishDate:{type:String},
Category:{type:String},
Price:{type:Number},
SoldCount:{type:Number},
BookImageLink:{type:String},
})

const BookModel=mongoose.model("book",BookSchema)

module.exports=BookModel