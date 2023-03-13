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
            C_L100:0,
            C_L150:0,
            C_L180:0,
            C_L200:0,
            C_L225:0,
            C_L240:0,
            Remaining:0,
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
console.log(e.C_L100,e.C_L150)
var bag= Number(e.C_L100) + Number(e.C_L150) + Number(e.C_L180) + Number(e.C_L200) + Number(e.C_L225) + Number(e.C_L240)
console.log("usePart",bag)
            const AddData= await Record.findByIdAndUpdate(
                {_id:e._id},
                {
                    C_L100:Number(mm100) * Number(e.MOC) ,
                    C_L150:Number(mm150) * Number(e.MOC),
                    C_L180:Number(mm180) * Number(e.MOC),
                    C_L200:Number(mm200) * Number(e.MOC),
                    C_L225:Number(mm225) * Number(e.MOC),
                    C_L240:Number(mm240) * Number(e.MOC),
                    Remaining:Number(e.Total) - Number(
                        Number(mm100) * Number(e.MOC) + Number(mm150) * Number(e.MOC) + 
                        Number(mm180) * Number(e.MOC) + Number(mm200) * Number(e.MOC) +
                        Number(mm225) * Number(e.MOC) + Number(mm240) * Number(e.MOC) )
                    

                },
                {
                    new:true
                })
                // console.log(Number(e.Total) - Number(bag),"remaining")
// console.log("AddData",AddData)
        })



        res.send(data)
    } catch(err){
        return res.status(500).send(err)
    }
    
})




dailyRecord.put("/find", async(req, res)=>{
    const{mm100,mm150,mm180,mm200,mm225,mm240}=req.body
    const {SuppCode}=req.body
    try{
        const data= await Record.find({SuppCode:SuppCode})

        const AppPartNumber=[]
        
data.map( async (e)=>{
    // console.log(e._id,"ID of Item")

    AppPartNumber.push({id:e._id,PartNumber :e.PartNumber, MOC:e.MOC, Total:e.Total})

    const AddData= await Record.findByIdAndUpdate(
        {_id:e._id},
        {
            C_L100:0 ,
            C_L150:0,
            C_L180:0,
            C_L200:0,
            C_L225:0,
            C_L240:0,
            Remaining:e.Total
            

        },
        {
            new:true
        })




})

// console.log(AppPartNumber)
// mm100?console.log(AppPartNumber[0].id):console.log("NA")
//         res.send(AppPartNumber)


//For 100mm Motor
if(mm100){
    console.log(AppPartNumber[0].MOC)
    const data100= await Record.findByIdAndUpdate(
        {_id:AppPartNumber[0].id},
        {
            C_L100:Number(mm100) * Number(AppPartNumber[0].MOC) ,
        
            Remaining:AppPartNumber[0].Total-(Number(mm100) * Number(AppPartNumber[0].MOC))
            

        },
        {
            new:true
        })

}
else{
    console.log("NA")
}


//For 150mm Motor
if(mm150){
    console.log(AppPartNumber[1].MOC)
    const data180= await Record.findByIdAndUpdate(
        {_id:AppPartNumber[1].id},
        {
            
            C_L150:Number(mm150) * Number(AppPartNumber[1].MOC),
          
            Remaining:AppPartNumber[1].Total-(Number(mm150) * Number(AppPartNumber[1].MOC))
            

        },
        {
            new:true
        })

}
else{
    console.log("NA")
}



//For 180mm Motor
if(mm180){
    console.log(AppPartNumber[2].MOC)
    const data180= await Record.findByIdAndUpdate(
        {_id:AppPartNumber[2].id},
        {
            
            C_L180:Number(mm180) * Number(AppPartNumber[2].MOC),
          
            Remaining:AppPartNumber[2].Total-(Number(mm180) * Number(AppPartNumber[2].MOC))
            

        },
        {
            new:true
        })

}
else{
    console.log("NA")
}



//For 200mm Motor
console.log(mm200,"200mm")
if(mm200){
    console.log(AppPartNumber[3].Total,"200mm")
    const data200= await Record.findByIdAndUpdate(
        {_id:AppPartNumber[3].id},
        {
            
            C_L200:Number(mm200) * Number(AppPartNumber[3].MOC),
          
            Remaining:AppPartNumber[3].Total-(Number(mm200) * Number(AppPartNumber[3].MOC))
            

        },
        {
            new:true
        })

}
else{
    console.log("NA")
}



//For 225mm Motor
if(mm225){
    console.log(AppPartNumber[4].MOC)
    const data225= await Record.findByIdAndUpdate(
        {_id:AppPartNumber[4].id},
        {
            
            C_L225:Number(mm225) * Number(AppPartNumber[4].MOC),
          
            Remaining:AppPartNumber[4].Total-(Number(mm225) * Number(AppPartNumber[4].MOC))
            

        },
        {
            new:true
        })

}
else{
    console.log("NA")
}



//For 240mm Motor
if(mm240){
    console.log(AppPartNumber[5].MOC)
    const data240= await Record.findByIdAndUpdate(
        {_id:AppPartNumber[5].id},
        {
            
            C_L240:Number(mm240) * Number(AppPartNumber[5].MOC),
          
            Remaining:AppPartNumber[5].Total-(Number(mm240) * Number(AppPartNumber[5].MOC))
            

        },
        {
            new:true
        })

}
else{
    console.log("NA")
}






res.send(data)
    }catch(err){
        return res.status(500).send(err)
    }
    
})




module.exports=dailyRecord