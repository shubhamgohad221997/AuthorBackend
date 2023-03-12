const express=require("express")
const Record=require("./Record.model")

const dailyRecord=express.Router()
dailyRecord.use(express.json())



//...//POST  All Item

dailyRecord.post("/", async(req, res)=>{

    const{SuppCode,PartNumber,PartName,Material,Discription,MOC,Unit,Total}=req.body;

    try{
        
           const recordItem = await Record.create({
            SuppCode:SuppCode,
            PartNumber:PartNumber,
            PartName:PartName,
            Material:Material,
            Discription:Discription,
            MOC:MOC,
            Unit:Unit,
            Total:Total,
           })
           
            return res.status(200).send({msg:"Data Added Successull", Data:recordItem})

        
    }catch(err){
        res.status(500).send(err)
    }
})


//GET All Item

dailyRecord.get("/", async(req, res)=>{
    try{
        const data= await Record.find()
        

        res.send(data)
    } catch(err){
        return res.status(500).send(err)
    }
    
})


// dailyRecord.post("/cal", async(req, res)=>{
//     const{}
//     try{
//         const data= await Record.find()
        

//         res.send(data)
//     } catch(err){
//         return res.status(500).send(err)
//     }
    
// })


module.exports=dailyRecord