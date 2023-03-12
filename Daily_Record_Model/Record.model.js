const mongoose=require("mongoose")

const DailyRecord=new mongoose.Schema({
    S_No:{type:Number, required:true},
    SuppCode:{type:String, required:true},
    PartNumber:{type:String, required:true},
    PartName:{type:String, required:true},
    Material:{type:String, required:true},
    Discription:{type:String, required:true},
    MOC:{type:Number, required:true},
    Unit:{type:String, required:true},
    Total:{type:Number, required:true},
    C_L100:{type:String, required:false},
    C_L150:{type:String, required:false},
    C_L180:{type:String, required:false},
    C_L200:{type:String, required:false},
    C_L225:{type:String, required:false},
    C_L240:{type:String, required:false},
    Remaining:{type:String, required:false},

})

const Records = mongoose.model("DailyRecords", DailyRecord )

module.exports = Records;