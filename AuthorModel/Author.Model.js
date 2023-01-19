const mongoose=require("mongoose")

const AuthorSchema=new mongoose.Schema({
    AuthorId:{type:Number},
    Name:{type:String},
    PhoneNumber:{type:Number},
    BrithDate:{type:String},
    DeathDate:{type:String},
    AuthorImageLink:{type:String},
})

const AuthorModel = mongoose.model("Bookauthor", AuthorSchema )

module.exports = AuthorModel;