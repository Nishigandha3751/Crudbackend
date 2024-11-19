const express=require('express')
const app= express()


const mongoose=require('mongoose')
const cors = require('cors');



require('dotenv').config()// or dotenv.config()


const port=process.env.port

mongoose.connect(process.env.db)
.then(() => { console.log("database has been connected") })
.catch((error) => { console.log(error) })

const newSchema=mongoose.Schema({
    title:{type:String,required:true},
    para:{type:String,required:true}

})

const Blog=mongoose.model('Blog',newSchema)

app.use(cors())
app.use(express.json())

app.get('/',async(req,res)=>{
    try {
        const blog=await Blog.find()
        res.status(200).json(blog)
        
    } catch (error) {
        res.status(400).json({message:error})
    }
   
})


app.get('/:id',async(req,res)=>{
    const {id}=req.params
    try {
        const blog=await Blog.findById(id)
        res.status(200).json(blog)
    } catch (error) {
        res.status(400).json({message:error})
    }
})

app.post('/add',async(req,res)=>{
    const{title,para}=req.body
    try {
        const blog=Blog({title,para})
        await blog.save()
        res.status(200).json({message:'blog created'})
    } catch (error) {
        res.status(400).json({message:error})
    }
    
})

app.put('/update/:id',async(req,res)=>{
    const {title,para}=req.body
    const{id}=req.params
    try {
        const blog=await Blog.findByIdAndUpdate(id,{title,para})
        res.status(200).json({message:"blog updated"})
        
    } catch (error) {
        res.status(400).json({message:error})
    }

})

app.delete('/delete/:id',async(req,res)=>{
    const {id}=req.params
    try {
        const blog=await Blog.findByIdAndDelete(id)
        res.status(200).json({message:"delete  blog",blog})

        
    } catch (error) {
        res.status(400).json({message:error})
    }
})




app.listen(port,(req,res)=>{
    console.log(`we are listening ${port}`)
})