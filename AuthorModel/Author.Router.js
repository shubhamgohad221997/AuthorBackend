
const express=require("express")
const AuthorModel=require("./Author.Model")

const Author=express.Router()
Author.use(express.json())

Author.post("/", async(req, res)=>{

    const {AuthorId, Name, PhoneNumber, BrithDate, DeathDate, AuthorImageLink}= req.body;

    try{
        if(!AuthorId && !Name){
            return res.status(400).send({error:"Enter all Input"})
        }
        //check author already exits
const author=await AuthorModel.find({AuthorId})

if(author.length>0){
    return res.status(400).send({error:"Author already exists"})
}
else{
    const AuthorData= new AuthorModel(req.body)
    await AuthorData.save()

    res.send({message:"Author Added Successfully", data:AuthorData})
}

    }
    catch(err){
        return res.status(500).send(err)
    }
})


// List all the author(s).

Author.get("/", async(req,res)=>{

    try{
        const data=await AuthorModel.find()
        const List=data.map(e=>e.Name)

        res.send({AuthorList:List})
    }catch(err){
        res.status(500).send(err)
    }

})



Author.get("/all", async(req,res)=>{

    try{
        const data=await AuthorModel.find()
        // const List=data.map(e=>e.Name)
console.log(data)
        res.send(data)
    }catch(err){
        res.status(500).send(err)
    }

})

module.exports=Author