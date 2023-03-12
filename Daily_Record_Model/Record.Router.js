const express=require("express")
const Record=require("./Record.model")

const dailyRecord=express.Router()
dailyRecord.use(express.json())



//...//POST  All Item

dailyRecord.post("/", async(req, res)=>{

    const{SuppCode,PartNumber,PartName,Material,Discription,MOC,Unit,Total, S_No}=req.body;

    try{
        
           const recordItem = await Record.create({
            S_No:S_No,
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


dailyRecord.put("/cal", async(req, res)=>{
    const{mm100,mm150,mm180,mm200,mm225,mm240}=req.body
    try{
        const data= await Record.find()
        
        data.map( async (e) =>{
            console.log("id",e._id)
            // console.log("MOC",e.MOC)
console.log("Total",e.Total)
let bag=e.C_L100+e.C_L150+e.C_L180+e.C_L200+e.C_L225+e.C_L240
console.log("usePart",bag)
            const AddData= await Record.findByIdAndUpdate(
                {_id:e._id},
                {
                    C_L100:mm100*(e.MOC) ,
                    
                    C_L150:mm150*(e.MOC),
                    C_L180:mm180*(e.MOC),
                    C_L200:mm200*(e.MOC),
                    C_L225:mm225*(e.MOC),
                    C_L240:mm240*(e.MOC),

                },
                {
                    new:true
                })
console.log("AddData",AddData)
        })



        res.send(data)
    } catch(err){
        return res.status(500).send(err)
    }
    
})


module.exports=dailyRecord