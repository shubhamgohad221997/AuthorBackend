
const express=require("express")
const BookModel=require("./Book.Model")
const book=express.Router()

book.use(express.json())


//Post req
book.post("/", async(req, res)=>{

    const{BookId, Title, AuthorId, Publisher, PublishDate, Category, Price, SoldCount, BookImageLink}=req.body;

    try{
        if(!BookId || !Title){
            return res.status(400).send({error:"Invalid Input"})
        }else{
            const data= new BookModel(req.body)
            await data.save()
            return res.status(200).send("Data Added Successull")

        }
    }catch(err){
        res.status(500).send(err)
    }
})


//List all the categories that present in catalog.

book.get("/category", async(req, res)=>{
    try{
        const data= await BookModel.find()
        let cate =data.map((e)=>e.Category)

        res.send({Category:cate})
    } catch(err){
        return res.status(500).send(err)
    }
    
})

// Most no.of.books sold

book.get("/sold/:id/:cat", async(req, res)=>{
    const {id, cat}=req.params
    console.log(id,cat)
    try{
        
        const data=await BookModel.find({$and: [{AuthorId:id}, {Category:cat}]}).sort({SoldCount:-1})

        // const data=await BookModel.find()
        console.log(data)
       res.send(data[0])
    }
    catch(err){
        return res.status(500).send(err)
    }
    
})

//All Books
book.get("/", async(req, res)=>{
    
    try{
        
        const data=await BookModel.find()

        // const data=await BookModel.find()
        console.log(data)
       res.send(data)
    }
    catch(err){
        return res.status(500).send(err)
    }
    
})


book.get("/all", async(req, res)=>{
    
    
    try{
        
        const data=await BookModel.find().populate("AuthorId")

        // const data=await BookModel.find()
        console.log(data)
       res.send(data)
    }
    catch(err){
        return res.status(500).send(err)
    }
    
})




// Search a book in the catalog

module.exports=book